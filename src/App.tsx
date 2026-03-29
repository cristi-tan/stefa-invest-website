import React, { useEffect, useState } from 'react';
import {
  Menu,
  X,
  CheckCircle,
  Factory,
  HardHat,
  Building2,
  Monitor,
  Boxes,
  Wrench,
  Award,
  Settings,
  ShieldCheck,
  Timer,
  Calendar,
  Handshake,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Facebook,
  Twitter,
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

const assetUrl = (path: string) => `./${path}`;

function SectionTitle({ title, light = false }: { title: string; light?: boolean }) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`font-heading text-3xl md:text-4xl font-bold uppercase mb-3 ${
          light ? 'text-white' : 'text-slate-800'
        }`}
      >
        {title}
      </h2>
      <div className="h-1 w-16 bg-red-600 mx-auto"></div>
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.projects, href: '#gallery' },
    { label: t.nav.partners, href: '#partners' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 bg-white shadow-md transition-all duration-300 border-b-4 border-red-600 ${
        isScrolled ? 'py-2' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 w-[90%] max-w-6xl flex justify-between items-center">
        <a href="#home" className="flex items-center">
          <img
            src={assetUrl('logo.png')}
            alt="Stefa Invest Cleaning Services"
            className="h-12 w-auto"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-heading font-medium text-slate-800 hover:text-red-600 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
            <button
              onClick={() => setLanguage('ro')}
              className={`font-heading font-bold transition-colors ${
                language === 'ro' ? 'text-red-600' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              RO
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`font-heading font-bold transition-colors ${
                language === 'en' ? 'text-red-600' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('ro')}
              className={`font-heading font-bold text-sm transition-colors ${
                language === 'ro' ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              RO
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setLanguage('en')}
              className={`font-heading font-bold text-sm transition-colors ${
                language === 'en' ? 'text-red-600' : 'text-slate-400'
              }`}
            >
              EN
            </button>
          </div>
          <button className="text-slate-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col items-center gap-4 border-t border-slate-100">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-heading font-medium text-slate-800 hover:text-red-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <header
      id="home"
      className="h-screen flex items-center text-center text-white bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.75), rgba(30, 41, 59, 0.75)), url('${assetUrl(
          'hero-bg.jpg',
        )}')`,
      }}
    >
      <div className="container mx-auto px-4 w-[90%] max-w-6xl mt-16">
        <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-5 whitespace-pre-line">
          {t.hero.title}
        </h1>
        <p className="text-lg md:text-xl font-light mb-10 max-w-3xl mx-auto">{t.hero.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href="#contact"
            className="inline-block px-8 py-3 font-heading font-bold uppercase rounded bg-red-600 text-white hover:bg-red-700 transition-colors border-2 border-transparent"
          >
            {t.hero.quoteBtn}
          </a>
          <a
            href="#about"
            className="inline-block px-8 py-3 font-heading font-bold uppercase rounded bg-transparent text-white border-2 border-white hover:bg-white hover:text-slate-800 transition-colors"
          >
            {t.hero.moreBtn}
          </a>
        </div>
      </div>
    </header>
  );
}

function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src={assetUrl('about-image.jpg')}
            alt="Operator riding an industrial floor cleaning machine"
            className="w-full rounded-lg shadow-xl"
          />
        </div>
        <div>
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-3 text-slate-800 text-left">
              {t.about.title}
            </h2>
            <div className="h-1 w-16 bg-red-600"></div>
          </div>
          <h3 className="font-heading text-2xl text-slate-800 mb-5 font-bold">{t.about.subtitle}</h3>
          <p className="text-slate-600 mb-4">{t.about.p1}</p>
          <p className="text-slate-600 mb-6">{t.about.p2}</p>
          <ul className="space-y-3">
            {t.about.list.map((item, i) => (
              <li key={i} className="flex items-start font-medium text-slate-800">
                <CheckCircle className="text-red-600 mr-3 shrink-0 mt-0.5" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLanguage();
  const services = [
    {
      icon: <Factory size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[0].title,
      desc: t.services.items[0].desc,
    },
    {
      icon: <HardHat size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[1].title,
      desc: t.services.items[1].desc,
    },
    {
      icon: <Building2 size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[2].title,
      desc: t.services.items[2].desc,
    },
    {
      icon: <Monitor size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[3].title,
      desc: t.services.items[3].desc,
    },
    {
      icon: <Boxes size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[4].title,
      desc: t.services.items[4].desc,
    },
    {
      icon: <Wrench size={48} className="text-red-600 mb-5 mx-auto" />,
      title: t.services.items[5].title,
      desc: t.services.items[5].desc,
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-100">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <SectionTitle title={t.services.title} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-lg text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-b-4 border-transparent hover:border-red-600"
            >
              {srv.icon}
              <h3 className="font-heading text-xl font-bold text-slate-800 mb-4">{srv.title}</h3>
              <p className="text-slate-600 text-sm">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  const { t } = useLanguage();
  const advantages = [
    {
      icon: <Award size={32} className="text-red-600" />,
      title: t.advantages.items[0].title,
      desc: t.advantages.items[0].desc,
    },
    {
      icon: <Settings size={32} className="text-red-600" />,
      title: t.advantages.items[1].title,
      desc: t.advantages.items[1].desc,
    },
    {
      icon: <ShieldCheck size={32} className="text-red-600" />,
      title: t.advantages.items[2].title,
      desc: t.advantages.items[2].desc,
    },
    {
      icon: <Timer size={32} className="text-red-600" />,
      title: t.advantages.items[3].title,
      desc: t.advantages.items[3].desc,
    },
    {
      icon: <Calendar size={32} className="text-red-600" />,
      title: t.advantages.items[4].title,
      desc: t.advantages.items[4].desc,
    },
    {
      icon: <Handshake size={32} className="text-red-600" />,
      title: t.advantages.items[5].title,
      desc: t.advantages.items[5].desc,
    },
  ];

  return (
    <section id="advantages" className="py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <SectionTitle title={t.advantages.title} light />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="bg-slate-900 p-4 rounded-full shrink-0">{adv.icon}</div>
              <div>
                <h4 className="font-heading text-lg font-bold mb-2">{adv.title}</h4>
                <p className="text-slate-300 text-sm">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { t } = useLanguage();
  const images = [
    {
      src: assetUrl('podele-fabricilor.jpg'),
      title: t.gallery.items[0],
    },
    {
      src: assetUrl('fatade-sticla.jpg'),
      title: t.gallery.items[1],
    },
    {
      src: assetUrl('warehouse-cleaning.jpg'),
      title: t.gallery.items[2],
    },
    {
      src: assetUrl('curatarea-birourilor.jpg'),
      title: t.gallery.items[3],
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <SectionTitle title={t.gallery.title} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg aspect-4/3 group">
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-red-700/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white font-heading font-bold text-xl">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const { t } = useLanguage();
  const partners = [
    { name: 'Buzil', img: assetUrl('buzil-logo-removebg-preview.png') },
    { name: 'Katrin', img: assetUrl('katrin-2-removebg-preview.png') },
    { name: 'Wilson', img: assetUrl('Wilson-removebg-preview.png') },
    { name: 'Kiss-fm', img: assetUrl('LOGO-KISS-FM-FUNDAL-ALB-removebg-preview.png') },
    { name: 'ModPack', img: assetUrl('mp2-removebg-preview.png') },
    { name: 'Nilfisk', img: assetUrl('Nilfisk-removebg-preview.png') },
    { name: 'Kauf', img: assetUrl('logo-kauf-vectorial-1-removebg-preview.png') },
    { name: 'Stefa Store', img: assetUrl('stefastore-removebg-preview.png') },
    {
      name: 'Wood Flooring',
      img: assetUrl('logowood-removebg-preview.png'),
      className: 'scale-100 max-w-[150px]',
    },
  ];

  return (
    <section id="partners" className="py-20 bg-slate-100 overflow-hidden">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <SectionTitle title={t.partners.title} />

        <div className="relative w-full flex overflow-x-hidden group mt-12">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center mx-12 md:mx-16 text-slate-400 hover:text-red-600 transition-colors duration-300"
              >
                <div className="h-24 flex items-center justify-center">
                  <img
                    src={partner.img}
                    alt={partner.name}
                    className={`max-h-full w-auto object-contain mix-blend-multiply contrast-[1.2] brightness-[1.1] grayscale hover:grayscale-0 transition-all duration-300 ${
                      partner.className || 'scale-[1.5]'
                    }`}
                  />
                </div>
                <span className="mt-4 font-heading font-bold text-lg">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <SectionTitle title={t.contact.title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-slate-800 text-white p-10 rounded-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">{t.contact.quoteTitle}</h3>
            <p className="text-slate-300 mb-8">{t.contact.quoteDesc}</p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-5">
                <Phone size={24} className="text-red-600 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold">{t.contact.phone}</h4>
                  <p className="text-slate-300">
                    <a href="tel:+40723279127" className="hover:text-white transition-colors">
                      0723 279 127
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Mail size={24} className="text-red-600 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold">{t.contact.email}</h4>
                  <p className="text-slate-300">
                    <a
                      href="mailto:office@stefainvest.ro"
                      className="hover:text-white transition-colors break-all"
                    >
                      office@stefainvest.ro
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <MapPin size={24} className="text-red-600 shrink-0" />
                <div>
                  <h4 className="font-heading font-bold">{t.contact.address}</h4>
                  <p className="text-slate-300">
                    str. Conului, nr.4, Parc Industrial Ploiesti.
                    <br />
                    Ploiesti, Cod Postal 100213
                  </p>
                </div>
              </div>
            </div>

            <div className="h-48 rounded-lg relative overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=str.%20Conului,%20nr.4,%20Parc%20Industrial%20Ploiesti&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = String(formData.get('name') ?? '');
              const email = String(formData.get('email') ?? '');
              const company = String(formData.get('company') ?? '');
              const service = String(formData.get('service') ?? '');
              const message = String(formData.get('message') ?? '');
              const subject = `${t.contact.form.subjectPrefix} ${name} (${company})`;
              const body = `${t.contact.form.bodyName}: ${name}\n${t.contact.form.bodyEmail}: ${email}\n${t.contact.form.bodyCompany}: ${company}\n${t.contact.form.bodyService}: ${service}\n\n${t.contact.form.bodyMessage}:\n${message}`;
              window.location.href = `mailto:office@stefainvest.ro?subject=${encodeURIComponent(
                subject,
              )}&body=${encodeURIComponent(body)}`;
            }}
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder={t.contact.form.name}
                required
                className="w-full p-4 border border-slate-300 rounded focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder={t.contact.form.email}
                required
                className="w-full p-4 border border-slate-300 rounded focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder={t.contact.form.company}
                required
                className="w-full p-4 border border-slate-300 rounded focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <input
                type="text"
                name="service"
                placeholder={t.contact.form.service}
                className="w-full p-4 border border-slate-300 rounded focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <textarea
                name="message"
                placeholder={t.contact.form.message}
                required
                className="w-full p-4 border border-slate-300 rounded h-40 resize-y focus:outline-none focus:border-red-600 transition-colors"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-red-600 text-white font-heading font-bold uppercase rounded hover:bg-red-700 transition-colors"
            >
              {t.contact.form.submit}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 w-[90%] max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="mb-5">
              <img
                src={assetUrl('logo.png')}
                alt="Stefa Invest Cleaning Services"
                className="h-16 w-auto"
              />
            </div>
            <p className="text-slate-400 mb-6">{t.footer.desc}</p>
            <div className="flex gap-4">
              <a
                href="mailto:office@stefainvest.ro"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all"
                aria-label="Email"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="tel:+40723279127"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all"
                aria-label="Phone"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#contact"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:-translate-y-1 transition-all"
                aria-label="Contact form"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-5">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              {t.footer.links.map((item, i) => {
                const hrefs = ['#home', '#about', '#services', '#gallery', '#contact'];
                return (
                  <li key={i}>
                    <a href={hrefs[i]} className="text-slate-400 hover:text-red-600 transition-colors">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-bold mb-5">{t.footer.ourServices}</h4>
            <ul className="space-y-3">
              {t.footer.services.map((item, i) => (
                <li key={i}>
                  <a href="#services" className="text-slate-400 hover:text-red-600 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center pt-6 border-t border-white/10 text-slate-400 text-sm">
          <p>&copy; 2026 Stefa Invest Cleaning Services. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="font-sans text-slate-800 bg-white">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Advantages />
      <Gallery />
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
}
