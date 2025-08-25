import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Baby, 
  BookOpen, 
  GraduationCap, 
  Trophy,
  Users,
  Clock,
  Palette,
  Calculator,
  Globe,
  Music,
  Atom,
  Heart,
  MapPin,
  Target,
  Calendar,
  Dumbbell,
  Camera
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ScrollReveal from "@/components/ScrollReveal";

const CombinedPage = () => {
  const { t, language, isRTL } = useLanguage();

  useEffect(() => {
    // Handle hash-based scrolling when coming from external pages
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = 80;
        const targetPosition = targetElement.offsetTop - headerHeight;
        setTimeout(() => {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }

    // Track website visits
    const trackVisit = () => {
      try {
        const currentVisits = parseInt(localStorage.getItem('websiteVisits') || '0');
        localStorage.setItem('websiteVisits', (currentVisits + 1).toString());
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);

  // Programs data
  const programs = [
    {
      id: "elementary",
      title: "Elementary School",
      titleAr: "المرحلة الابتدائية",
      ageGroup: "6-10 years",
      ageGroupAr: "6-10 سنة",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      description: t('elementaryDescription'),
      features: [
        t('elementaryFeature1'),
        t('elementaryFeature2'),
        t('elementaryFeature3'),
        t('elementaryFeature4'),
        t('elementaryFeature5'),
        t('elementaryFeature6')
      ],
      subjects: [
        { name: t('english'), icon: Globe },
        { name: t('arabic'), icon: BookOpen },
        { name: t('mathematics'), icon: Calculator },
        { name: t('science'), icon: Atom },
        { name: t('socialStudies'), icon: Users },
        { name: t('arts'), icon: Palette }
      ]
    },
    {
      id: "middle",
      title: "Middle School",
      titleAr: "المرحلة الإعدادية",
      ageGroup: "11-14 years",
      ageGroupAr: "11-14 سنة",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
      description: t('middleDescription'),
      features: [
        t('middleFeature1'),
        t('middleFeature2'),
        t('middleFeature3'),
        t('middleFeature4'),
        t('middleFeature5'),
        t('middleFeature6')
      ],
      subjects: [
        { name: t('advancedEnglish'), icon: Globe },
        { name: t('arabicLiterature'), icon: BookOpen },
        { name: t('advancedMathematics'), icon: Calculator },
        { name: t('physicsChemistry'), icon: Atom },
        { name: t('biology'), icon: Heart },
        { name: t('computerScience'), icon: Users }
      ]
    },
    {
      id: "high",
      title: "High School",
      titleAr: "المرحلة الثانوية",
      ageGroup: "15-18 years",
      ageGroupAr: "15-18 سنة",
      icon: GraduationCap,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      description: t('highDescription'),
      features: [
        t('highFeature1'),
        t('highFeature2'),
        t('highFeature3'),
        t('highFeature4'),
        t('highFeature5'),
        t('highFeature6')
      ],
      subjects: [
        { name: t('advancedEnglish'), icon: Globe },
        { name: t('arabicLiterature'), icon: BookOpen },
        { name: t('advancedMathematics'), icon: Calculator },
        { name: t('physics'), icon: Atom },
        { name: t('chemistry'), icon: Atom },
        { name: t('biology'), icon: Heart }
      ]
    }
  ];

  // Activities data
  const activities = [
    {
      title: t('scienceFair'),
      titleAr: t('scienceFair'),
      date: t('scienceFairDate'),
      category: "Academic",
      categoryAr: "أكاديمي",
      description: t('scienceFairDesc'),
      image: "/assets/biology.png",
      participants: t('participants150'),
      icon: BookOpen
    },
    {
      title: t('sportsDay'),
      titleAr: t('sportsDay'),
      date: t('sportsDayDate'),
      category: "Sports",
      categoryAr: "رياضة",
      description: t('sportsDayDesc'),
      image: "/assets/sports.png",
      participants: t('participantsAll'),
      icon: Dumbbell
    },
    {
      title: t('culturalFestival'),
      titleAr: t('culturalFestival'),
      date: t('culturalFestivalDate'),
      category: "Cultural",
      categoryAr: "ثقافي",
      description: t('culturalFestDesc'),
      image: "/assets/books.png",
      participants: t('participants200'),
      icon: Palette
    },
    {
      title: t('modelUN'),
      titleAr: t('modelUN'),
      date: t('modelUNDate'),
      category: "Leadership",
      categoryAr: "قيادة",
      description: t('munDesc'),
      image: "/assets/mukhtarday.jpg",
      participants: t('participantsHighSchool'),
      icon: Globe
    },
    {
      title: t('musicArtsShowcase'),
      titleAr: t('musicArtsShowcase'),
      date: t('musicArtsDate'),
      category: "Arts",
      categoryAr: "فنون",
      description: t('artsShowcaseDesc'),
      image: "/assets/art.png",
      participants: t('participants80'),
      icon: Music
    },
    {
      title: t('mathOlympiad'),
      titleAr: t('mathOlympiad'),
      date: t('mathOlympiadDate'),
      category: "Academic",
      categoryAr: "أكاديمي",
      description: t('mathOlympiadDesc'),
      image: "/assets/chess.jpg",
      participants: t('participants30'),
      icon: Trophy
    }
  ];

  const categories = [
    { name: "Academic", nameAr: "أكاديمي", color: "bg-blue-100 text-blue-800", icon: BookOpen },
    { name: "Sports", nameAr: "رياضة", color: "bg-green-100 text-green-800", icon: Dumbbell },
    { name: "Cultural", nameAr: "ثقافي", color: "bg-purple-100 text-purple-800", icon: Palette },
    { name: "Leadership", nameAr: "قيادة", color: "bg-orange-100 text-orange-800", icon: Globe },
    { name: "Arts", nameAr: "فنون", color: "bg-pink-100 text-pink-800", icon: Music }
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.color : "bg-gray-100 text-gray-800";
  };

  const news = [
    {
      title: t('newLabTitle'),
      titleAr: t('newLabTitle'),
      date: t('newLabDate'),
      summary: t('newLabSummary')
    },
    {
      title: t('debateWinTitle'),
      titleAr: t('debateWinTitle'),
      date: t('debateWinDate'),
      summary: t('debateWinSummary')
    },
    {
      title: t('newLibraryTitle'),
      titleAr: t('newLibraryTitle'),
      date: t('newLibraryDate'),
      summary: t('newLibrarySummary')
    }
  ];

  // About page data
  const stats = [
    { label: "Years of Excellence", value: "15+", icon: Target },
    { label: "Students", value: "1850+", icon: Users },
    { label: "Teachers", value: "90+", icon: BookOpen },
    { label: "Graduates", value: "1700+", icon: Target },
  ];

  const staff = [
    {
      name: "Dr. Ahmad Al-Aqleh",
      nameAr: "د. أحمد العقلة",
      role: "Principal",
      roleAr: "المدير العام",
      qualificationKey: "phD",
    },
    {
      name: "Ms. Batoul Mohammad",
      nameAr: "أ. بتول محمد",
      role: "Academic Director",
      roleAr: "مديرة الشؤون الأكاديمية",
      qualificationKey: "medCurriculum",
    },
    {
      name: "Dr. Mohammad Makkieh",
      nameAr: "د. محمد مكيّة",
      role: "Student Affairs Director",
      roleAr: "مدير شؤون الطلاب",
      qualificationKey: "maPsychology",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Home Section - Hero */}
      <section id="home" className="relative text-white py-32 overflow-hidden">
        {/* School image background */}
        <div className="absolute inset-0">
          <img 
            src="/assets/school.png" 
            alt="School Building" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlay with transparency from middle to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary from-40% via-primary/60 via-60% to-transparent to-100%"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0} scale={0.8} duration={800} easing="ease-in-out">
            <img
              src="/assets/logoM.jpg"
              alt="Al-Mukhtar Model Schools"
              className="h-24 w-auto mx-auto mb-8"
            />
          </ScrollReveal>
          <ScrollReveal delay={200} origin="top" distance="80px" duration={1000}>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${isRTL ? 'font-cairo' : ''}`}>
              {t('heroTitle')}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={400} origin="left" distance="60px" duration={800}>
            <p className={`text-2xl md:text-4xl font-semibold mb-8 ${isRTL ? '' : 'font-open-sans'}`}>
              {t('heroSubtitle')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={600} origin="right" distance="60px" duration={800}>
            <p className={`text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto ${isRTL ? '' : 'font-open-sans'}`}>
              {t('heroDescription')}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={800} origin="bottom" distance="40px" duration={1000} easing="ease-in-out">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-accent hover:bg-accent-light text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => window.location.href = '/enrollment'}
              >
                {t('enrollNow')}
              </Button>
              <Button 
                className="border border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => {
                  const aboutSection = document.getElementById('about');
                  if (aboutSection) {
                    const headerHeight = 80;
                    const targetPosition = aboutSection.offsetTop - headerHeight;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                {t('learnMore')}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Home Section - Quick Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <ScrollReveal delay={0} origin="bottom" distance="30px" scale={0.9} duration={700}>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className={`text-muted-foreground ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('yearsOfExcellence')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150} origin="bottom" distance="30px" scale={0.9} duration={700}>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold text-primary mb-2">1850+</div>
                <div className={`text-muted-foreground ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('students')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300} origin="bottom" distance="30px" scale={0.9} duration={700}>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold text-primary mb-2">90+</div>
                <div className={`text-muted-foreground ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('teachers')}</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={450} origin="bottom" distance="30px" scale={0.9} duration={700}>
              <div className="transform transition-all duration-300 hover:scale-110">
                <div className="text-4xl font-bold text-primary mb-2">3+</div>
                <div className={`text-muted-foreground ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>{t('successRate')}</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen bg-background font-open-sans">
        {/* About Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal delay={0} origin="left" distance="60px" duration={800} easing="ease-in-out">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-cairo' : ''}`}>
                {t('aboutTitle')}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200} origin="right" distance="60px" duration={800} easing="ease-in-out">
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {t('aboutDescription')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <ScrollReveal delay={100} origin="left" distance="50px" duration={800}>
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className={`text-2xl text-primary ${isRTL ? 'font-cairo' : ''}`}>
                    {t('vision')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('visionText')}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={300} origin="right" distance="50px" duration={800}>
              <Card className="border-accent/20 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className={`text-2xl text-accent ${isRTL ? 'font-cairo' : ''}`}>
                    {t('mission')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('missionText')}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Statistics */}
          <section className="mb-16">
            <ScrollReveal delay={0} origin="bottom" distance="40px" duration={800}>
              <h2 className={`text-3xl font-bold text-center mb-12 text-primary ${isRTL ? 'font-cairo' : ''}`}>
                {isRTL ? 'إنجازاتنا' : 'Our Achievements'}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ScrollReveal delay={100} origin="bottom" distance="30px" scale={0.95} duration={600}>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Target className="h-8 w-8 text-secondary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">{t('yearsOfExcellence')}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={200} origin="bottom" distance="30px" scale={0.95} duration={600}>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Users className="h-8 w-8 text-secondary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">1850+</div>
                    <div className="text-sm text-muted-foreground">{t('students')}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={300} origin="bottom" distance="30px" scale={0.95} duration={600}>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <BookOpen className="h-8 w-8 text-secondary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">90+</div>
                    <div className="text-sm text-muted-foreground">{t('teachers')}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
              <ScrollReveal delay={400} origin="bottom" distance="30px" scale={0.95} duration={600}>
                <Card className="text-center border-secondary/20 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Target className="h-8 w-8 text-secondary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">{t('graduates')}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </section>

          {/* School History */}
          <section className="mb-16">
            <ScrollReveal delay={0} origin="left" distance="60px" duration={900} easing="ease-in-out">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className={`text-2xl text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                    {t('schoolHistory')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-muted-foreground">
                    <ScrollReveal delay={200} origin="bottom" distance="20px" duration={700} opacity={0.2}>
                      <p className="mb-4">
                        {t('historyParagraph1')}
                      </p>
                    </ScrollReveal>
                    <ScrollReveal delay={400} origin="bottom" distance="20px" duration={700} opacity={0.2}>
                      <p className="mb-4">
                        {t('historyParagraph2')}
                      </p>
                    </ScrollReveal>
                    <ScrollReveal delay={600} origin="bottom" distance="20px" duration={700} opacity={0.2}>
                      <p>
                        {t('historyParagraph3')}
                      </p>
                    </ScrollReveal>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </section>

          {/* Key Staff */}
          <section className="mb-16">
            <ScrollReveal delay={0} origin="top" distance="40px" duration={800}>
              <h2 className={`text-3xl font-bold text-center mb-12 text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                {isRTL ? 'فريق الإدارة' : 'Leadership Team'}
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {staff.map((member, index) => (
                <ScrollReveal 
                  key={member.name} 
                  delay={200 * (index + 1)} 
                  origin={index % 2 === 0 ? "left" : "right"} 
                  distance="50px" 
                  duration={800} 
                  easing="ease-out"
                >
                  <Card className="text-center border-accent/20 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Users className="h-12 w-12 text-white" />
                      </div>
                      <h3 className={`text-xl font-semibold text-primary mb-1 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                        {isRTL ? member.nameAr : member.name}
                      </h3>
                      <Badge variant="secondary" className={`mb-2 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                        {isRTL ? member.roleAr : member.role}
                      </Badge>
                      {member.qualificationKey && (
                        <p className="text-sm text-muted-foreground font-open-sans">
                          {t(member.qualificationKey)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Location */}
          <section>
            <ScrollReveal delay={0} origin="bottom" distance="40px" duration={800}>
              <h2 className={`text-3xl font-bold text-center mb-12 text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                {isRTL ? 'موقعنا' : 'Our Location'}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200} origin="bottom" distance="60px" duration={1000} easing="ease-in-out">
              <Card className="border-secondary/20">
                <CardContent className="p-0">
                  <div className="aspect-video w-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7!2d36.30206!3d!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDI5JzIyLjIiTiAzNsKwMTgnMDcuNCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Al-Mukhtar Model Schools Location"
                    ></iframe>
                  </div>
                  <ScrollReveal delay={400} origin="left" distance="30px" duration={600}>
                    <div className="p-6 flex items-center space-x-3 rtl:space-x-reverse bg-muted/50">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className={`font-semibold text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                          {isRTL ? t('schoolNameAr') : t('schoolName')}
                        </p>
                        <p className="text-sm text-muted-foreground font-open-sans">{t('schoolAddress')}</p>
                        <p className="text-xs text-muted-foreground">33.48949° N, 36.30206° E</p>
                      </div>
                    </div>
                  </ScrollReveal>
                </CardContent>
              </Card>
            </ScrollReveal>
          </section>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="min-h-screen bg-background font-open-sans">
        {/* Programs Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal delay={0} origin="top" distance="60px" duration={900} easing="ease-in-out">
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                {t('programsTitle')}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200} origin="bottom" distance="40px" duration={800}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {t('programsSubtitle')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Programs Overview */}
          <ScrollReveal delay={0} origin="left" distance="50px" duration={800} easing="ease-out">
            <div className="text-center mb-16">
              <h2 className={`text-3xl font-bold mb-4 text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                {t('educationalStages')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('educationalStagesDescription')}
              </p>
            </div>
          </ScrollReveal>

          {/* Programs Grid */}
          <div className="space-y-16">
            {programs.map((program, index) => (
              <ScrollReveal 
                key={program.id} 
                delay={index * 200} 
                origin={index % 2 === 0 ? "left" : "right"} 
                distance="80px" 
                duration={900} 
                easing="ease-in-out"
              >
                <div className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <Card className="overflow-hidden border-0 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="lg:flex">
                      {/* Program Header */}
                      <div className={`lg:w-2/5 p-8 ${program.bgColor} flex items-center justify-center`}>
                        <div className="text-center">
                          <ScrollReveal delay={100} scale={0.8} duration={700} easing="ease-out">
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white mb-6 ${program.color} transform transition-transform duration-300 hover:scale-110`}>
                              <program.icon className="h-10 w-10" />
                            </div>
                          </ScrollReveal>
                          <ScrollReveal delay={200} origin="top" distance="20px" duration={600}>
                            <h3 className={`text-2xl font-bold mb-3 text-gray-800 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                              {isRTL ? program.titleAr : program.title}
                            </h3>
                          </ScrollReveal>
                          <ScrollReveal delay={300} scale={0.9} duration={500}>
                            <Badge variant="secondary" className={`text-lg px-4 py-2 ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                              {isRTL ? program.ageGroupAr : program.ageGroup}
                            </Badge>
                          </ScrollReveal>
                        </div>
                      </div>

                      {/* Program Content */}
                      <div className="lg:w-3/5 p-8">
                        <CardContent className="p-0">
                          <ScrollReveal delay={100} origin="bottom" distance="30px" duration={700}>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                              {program.description}
                            </p>
                          </ScrollReveal>

                          {/* Key Features */}
                          <ScrollReveal delay={200} origin="left" distance="40px" duration={800}>
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold mb-3 text-primary font-open-sans">
                                {t('keyFeatures')}
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {program.features.map((feature, idx) => (
                                  <ScrollReveal key={feature} delay={idx * 100} origin="left" distance="20px" duration={500}>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                      <Trophy className="h-4 w-4 text-secondary flex-shrink-0" />
                                      <span className="text-sm text-muted-foreground">{feature}</span>
                                    </div>
                                  </ScrollReveal>
                                ))}
                              </div>
                            </div>
                          </ScrollReveal>

                          {/* Subjects */}
                          <ScrollReveal delay={300} origin="right" distance="40px" duration={800}>
                            <div className="mb-6">
                              <h4 className="text-lg font-semibold mb-3 text-primary font-open-sans">
                                {t('coreSubjects')}
                              </h4>
                              <div className="grid grid-cols-3 gap-3">
                                {program.subjects.map((subject, idx) => (
                                  <ScrollReveal key={subject.name} delay={idx * 50} scale={0.9} duration={400}>
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                                      <subject.icon className="h-4 w-4 text-accent" />
                                      <span className="text-sm font-medium">{t(subject.name)}</span>
                                    </div>
                                  </ScrollReveal>
                                ))}
                              </div>
                            </div>
                          </ScrollReveal>

                          <ScrollReveal delay={400} origin="bottom" distance="20px" duration={600}>
                            <Button 
                              className="bg-accent hover:bg-accent-light text-accent-foreground transition-all duration-300 hover:scale-105"
                              onClick={() => window.location.href = '/contact'}
                            >
                              {t('learnMore')}
                            </Button>
                          </ScrollReveal>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Additional Information */}
          <section className="mt-16 text-center">
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className={`text-2xl text-primary ${isRTL ? 'font-cairo' : 'font-open-sans'}`}>
                  {t('teachingApproach')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2 text-primary font-open-sans">{t('flexibleSchedule')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('flexibleScheduleDesc')}
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2 text-primary font-open-sans">{t('smallClassSizes')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('smallClassSizesDesc')}
                    </p>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-8 w-8 text-secondary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2 text-primary font-open-sans">{t('excellenceFocus')}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t('excellenceFocusDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="min-h-screen bg-background font-open-sans">
        {/* Activities Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal delay={0}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-cairo">
                {t('activitiesTitle')}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                {t('activitiesSubtitle')}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Categories Filter */}
          <div className="mb-12">
            <ScrollReveal delay={0}>
              <h2 className="text-2xl font-bold mb-6 text-primary text-center font-cairo">
                {t('activityCategories')}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category, index) => (
                  <div key={category.name} className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full ${category.color}`}>
                    <category.icon className="h-4 w-4" />
                    <span className="font-medium font-cairo">{language === 'ar' ? category.nameAr : category.name}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Activities Grid */}
          <section className="mb-16">
            <ScrollReveal delay={0}>
              <h2 className="text-3xl font-bold text-center mb-12 text-primary font-cairo">
                {t('upcomingActivities')}
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity, index) => (
                <ScrollReveal key={activity.title} delay={200 + index * 200}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow border-accent/20">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(activity.category)}>
                          {language === 'ar' ? activity.categoryAr : activity.category}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {activity.date}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-cairo">
                        {language === 'ar' ? activity.titleAr : activity.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          {activity.participants}
                        </div>
                        <activity.icon className="h-5 w-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>

          {/* Latest News */}
          <section>
            <ScrollReveal delay={0} origin="top" distance="40px" duration={800}>
              <h2 className="text-3xl font-bold text-center mb-12 text-primary font-cairo">
                {t('latestNews')}
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {news.map((item, index) => (
                <ScrollReveal 
                  key={item.title} 
                  delay={200 + index * 200} 
                  origin={index % 3 === 0 ? "bottom" : index % 3 === 1 ? "left" : "right"}
                  distance="50px" 
                  duration={800} 
                  easing="ease-in-out"
                >
                  <Card className="border-secondary/20 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <ScrollReveal delay={100} origin="left" distance="20px" duration={500}>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {item.date}
                        </div>
                      </ScrollReveal>
                      <ScrollReveal delay={200} origin="right" distance="20px" duration={600}>
                        <CardTitle className="text-lg font-cairo">
                          {language === 'ar' ? item.titleAr : item.title}
                        </CardTitle>
                      </ScrollReveal>
                    </CardHeader>
                    <CardContent>
                      <ScrollReveal delay={300} scale={0.95} duration={700} easing="ease-out">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {t(item.summary)}
                        </p>
                      </ScrollReveal>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </section>




        </div>
      </section>
    </div>
  );
};

export default CombinedPage;