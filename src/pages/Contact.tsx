import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0} origin="top" distance="60px" duration={900}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-cairo">
              {t('contactTitle')}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200} origin="bottom" distance="40px" duration={800}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <ScrollReveal delay={300} origin="left" distance="50px" duration={800}>
              <h2 className="text-3xl font-bold mb-8 text-primary font-cairo">
                {t('contactInformation')}
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              <ScrollReveal delay={400} origin="left" distance="50px" duration={800}>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <MapPin className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary font-cairo">{t('address')}</h3>
                        <p className="text-muted-foreground font-open-sans">{t('schoolAddress')}</p>
                        <p className="text-sm text-muted-foreground">{t('coordinates')}: 33.48949° N, 36.30206° E</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={500} origin="left" distance="50px" duration={800}>
                <Card className="border-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <Phone className="h-6 w-6 text-accent mt-1" />
                      <div>
                        <h3 className="font-semibold text-accent font-cairo">{t('phoneNumber')}</h3>
                        <p className="text-muted-foreground font-open-sans" dir="ltr">{t('schoolPhone')}</p>
                        <p className="text-sm text-muted-foreground">{t('administrationOffice')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={600} origin="left" distance="50px" duration={800}>
                <Card className="border-secondary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <Mail className="h-6 w-6 text-secondary mt-1" />
                      <div>
                        <h3 className="font-semibold text-secondary font-cairo">{t('emailAddress')}</h3>
                        <p className="text-muted-foreground font-open-sans">{t('schoolEmail')}</p>
                        <p className="text-sm text-muted-foreground">{t('generalInformation')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={700} origin="left" distance="50px" duration={800}>
                <Card className="border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <Clock className="h-6 w-6 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-primary font-cairo">{t('workingHours')}</h3>
                        <p className="text-muted-foreground font-open-sans">{t('workingHoursValue')}</p>
                        <p className="text-sm text-muted-foreground">{t('officeHours')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <ScrollReveal delay={800} origin="bottom" distance="40px" duration={800}>
                <h3 className="text-xl font-semibold mb-4 text-primary font-cairo">
                  {t('followUs')}
                </h3>
                <div className="flex space-x-4 rtl:space-x-reverse">
                  <a href="https://www.facebook.com/AlMUKHTARMODELSCHOOLS/" target="_blank" rel="noopener noreferrer" className="p-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="p-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors">
                    <Send className="h-5 w-5" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ScrollReveal delay={400} origin="right" distance="50px" duration={800}>
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary font-cairo">
                    {t('sendMessage')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 font-open-sans">{t('yourName')}</label>
                      <Input placeholder={t('yourFullName')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 font-open-sans">{t('emailAddress')}</label>
                      <Input type="email" placeholder={t('yourEmail')} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-open-sans">{t('phoneNumber')}</label>
                    <Input placeholder={t('yourPhone')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-open-sans">{t('messageSubject')}</label>
                    <Input placeholder={t('messageSubject')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-open-sans">{t('message')}</label>
                    <Textarea 
                      placeholder={t('yourMessage')} 
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent-light text-accent-foreground">
                    {t('sendMessage')}
                  </Button>
                </form>
              </CardContent>
            </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;