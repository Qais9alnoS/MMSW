import { Facebook, Instagram, Send, Phone, Mail, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to section
    if (location.pathname === '/') {
      const targetId = href.substring(href.indexOf('#') + 1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = 80; // Approximate height of the fixed header
        const targetPosition = targetElement.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on another page, navigate to home page with hash
      window.location.href = href;
    }
  };
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <img
              src="/assets/logoM.jpg"
              alt="Al-Mukhtar Model Schools"
              className="h-16 w-auto mb-4"
            />
            <h3 className={`text-lg font-bold mb-2 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
              {t('heroTitle')}
            </h3>
            <p className={`text-sm text-primary-foreground/80 mb-4 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
              {t('heroSubtitle')}
            </p>
            <p className={`text-sm text-primary-foreground/70 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
              {t('schoolDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/#about" 
                  onClick={(e) => handleScrollToSection(e, "/#about")}
                  className={`text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors ${isRTL ? 'font-cairo' : 'font-open-sans'} cursor-pointer`}
                >
                  {t('about')}
                </a>
              </li>
              <li>
                <a 
                  href="/#programs" 
                  onClick={(e) => handleScrollToSection(e, "/#programs")}
                  className={`text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors ${isRTL ? 'font-cairo' : 'font-open-sans'} cursor-pointer`}
                >
                  {t('programs')}
                </a>
              </li>
              <li>
                <a 
                  href="/#activities" 
                  onClick={(e) => handleScrollToSection(e, "/#activities")}
                  className={`text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors ${isRTL ? 'font-cairo' : 'font-open-sans'} cursor-pointer`}
                >
                  {t('activitiesNav')}
                </a>
              </li>
              <li>
                <Link to="/enrollment" className={`text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                  {t('enrollment')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className={`text-sm text-primary-foreground/80 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                  {t('schoolAddress')}
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className={`text-sm text-primary-foreground/80 ${isRTL ? 'font-cairo' : 'font-open-sans'}`} dir="ltr">
                  {t('schoolPhone')}
                </span>
              </li>
              <li className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className={`text-sm text-primary-foreground/80 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                  {t('schoolEmail')}
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('followUs')}</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a
                href="https://www.facebook.com/AlMUKHTARMODELSCHOOLS/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label={t('facebook')}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label={t('instagram')}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
                aria-label={t('telegram')}
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className={`text-sm text-primary-foreground/70 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
            {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;