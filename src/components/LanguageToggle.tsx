import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage, isRTL, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="lg:gap-2">
          <Globe className="h-4 w-4" />
          <span className="font-semibold hidden lg:inline">
            {language === 'ar' ? t('arabicLanguage') : t('englishLanguage')}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage('en')}
          className={language === 'en' ? 'font-bold bg-accent' : ''}
        >
          {t('englishLanguage')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage('ar')}
          className={language === 'ar' ? 'font-bold bg-accent' : ''}
        >
          {t('arabicLanguage')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;