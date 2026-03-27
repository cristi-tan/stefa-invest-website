import nodemailer from 'nodemailer';

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  message?: string;
  language?: string;
};

const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'CONTACT_TO_EMAIL',
] as const;

function getMissingEnvVars() {
  return requiredEnvVars.filter((key) => !process.env[key]);
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeBody(body: unknown): ContactPayload {
  if (!body) {
    return {};
  }

  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as ContactPayload;
    } catch {
      return {};
    }
  }

  if (typeof body === 'object') {
    return body as ContactPayload;
  }

  return {};
}

export async function POST(request: Request) {
  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    return Response.json({
      error: 'Server email configuration is incomplete',
      missing: missingEnvVars,
    }, { status: 500 });
  }

  const body = normalizeBody(await request.text());
  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const company = body.company?.trim() ?? '';
  const service = body.service?.trim() ?? '';
  const message = body.message?.trim() ?? '';
  const language = body.language?.trim() ?? 'ro';

  if (!name || !email || !company || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const recipient = process.env.CONTACT_TO_EMAIL!;
  const fromAddress = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER!;
  const replyTo = email;
  const subjectPrefix = language === 'en' ? 'Website contact request' : 'Cerere de contact website';
  const safeService = service || (language === 'en' ? 'Not specified' : 'Nespecificat');

  await transporter.sendMail({
    from: fromAddress,
    to: recipient,
    replyTo,
    subject: `${subjectPrefix}: ${name} (${company})`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company}`,
      `Service: ${safeService}`,
      '',
      'Message:',
      message,
    ].join('\n'),
    html: `
      <h2>${language === 'en' ? 'New contact request' : 'Cerere noua de contact'}</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Service:</strong> ${escapeHtml(safeService)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
    `,
  });

  return Response.json({ ok: true });
}

export function GET() {
  return Response.json({ error: 'Method not allowed' }, {
    status: 405,
    headers: { Allow: 'POST' },
  });
}
