import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, language, isRTL } = useLanguage();
  const location = useLocation();

  const navigation = [
    { key: 'home', href: "/#home", type: 'section' },
    { key: 'about', href: "/#about", type: 'section' },
    { key: 'programs', href: "/#programs", type: 'section' },
    { key: 'activitiesNav', href: "/#activities", type: 'section' },
    { key: 'gallery', href: "/gallery", type: 'page' },
    { key: 'enrollment', href: "/enrollment", type: 'page' },
    { key: 'contact', href: "/contact", type: 'page' },
  ];

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
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-primary fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleScrollToSection(e, "#home")} className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer">
            <img
              src="/assets/logoM.jpg"
              alt={t('schoolName')}
              className="h-14 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold text-primary ${isRTL ? 'font-cairo' : ''}`}>
                {t('schoolName')}
              </h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navigation.map((item) =>
              item.type === 'section' ? (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary text-foreground cursor-pointer"
                >
                  {t(item.key)}
                </a>
              ) : (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-primary ${
                    location.pathname === item.href
                      ? "text-primary border-b-2 border-primary"
                      : "text-foreground"
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            )}
            <LanguageToggle />
          </nav>

          {/* Mobile menu button and language toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('toggleMenu')}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) =>
                  item.type === 'section' ? (
                    <a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleScrollToSection(e, item.href)}
                      className="block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 text-foreground hover:text-primary hover:bg-primary/5 cursor-pointer"
                    >
                      {t(item.key)}
                    </a>
                  ) : (
                    <Link
                      key={item.key}
                      to={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                        location.pathname === item.href
                          ? "text-primary bg-primary/5"
                          : "text-foreground hover:text-primary hover:bg-primary/5"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  )
                )}
                {/* Language toggle moved outside the mobile menu */}
              </div>
            </div>
          )}
      </div>
    </header>
  );
};

export default Header;