import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  Users, 
  Building, 
  Trophy, 
  Palette, 
  Dumbbell,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";

const Gallery = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    { id: "all", name: t('all'), icon: Camera },
    { id: "classrooms", name: t('classrooms'), icon: Building },
    { id: "facilities", name: t('facilities'), icon: Building },
    { id: "sports", name: t('sports'), icon: Dumbbell },
    { id: "events", name: t('events'), icon: Trophy },
    { id: "activities", name: t('activities'), icon: Palette },
    { id: "students", name: t('students'), icon: Users }
  ];

  // Using placeholder images from Unsplash for demonstration
  const images = [
    {
      id: 1,
      src: "https://i.postimg.cc/G2CHFNsQ/class.png",
      alt: t('modernClassroom'),
      category: "classrooms",
      title: t('modernClassroom')
    },
    {
      id: 2,
      src: "https://i.postimg.cc/vHPBDhL4/theater.png",
      alt: t('scienceLaboratory'),
      category: "facilities",
      title: t('scienceLaboratory')
    },
    {
      id: 3,
      src: "https://i.postimg.cc/CL94khmp/sports.png",
      alt: t('sportsDay'),
      category: "sports",
      title: t('sportsDay')
    },
    {
      id: 4,
      src: "https://i.postimg.cc/CLXMCt3q/graduation.jpg",
      alt: t('graduation'),
      category: "events",
      title: t('graduation')
    },
    {
      id: 5,
      src: "https://i.postimg.cc/1zSFWjgP/art.png",
      alt: t('artWorkshop'),
      category: "activities",
      title: t('artWorkshop')
    },
    {
      id: 6,
      src: "https://i.postimg.cc/vBZdwtRy/lib.jpg",
      alt: t('schoolLibrary'),
      category: "facilities",
      title: t('schoolLibrary')
    },
    {
      id: 7,
      src: "https://i.postimg.cc/05TnFGJJ/students.jpg",
      alt: t('groupStudy'),
      category: "students",
      title: t('groupStudy')
    },
    {
      id: 8,
      src: "https://i.postimg.cc/0QWcMpz9/Arabic.png",
      alt: t('chemistryLab'),
      category: "facilities",
      title: t('chemistryLab')
    },
    {
      id: 9,
      src: "https://i.postimg.cc/cLvc8yd8/biology.png",
      alt: t('scienceFair'),
      category: "events",
      title: t('scienceFair')
    },
    {
      id: 10,
      src: "https://i.postimg.cc/FRxPVM1g/pclab.jpg",
      alt: t('computerLab'),
      category: "facilities",
      title: t('computerLab')
    },
    {
      id: 11,
      src: "https://i.postimg.cc/386F0j1b/tech.jpg",
      alt: t('techIntegration'),
      category: "classrooms",
      title: t('techIntegration')
    },
    {
      id: 12,
      src: "https://i.postimg.cc/cCgsnBLW/image.png",
      alt: t('musicConcert'),
      category: "activities",
      title: t('musicConcert')
    }
  ];

  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (src: string, index: number) => {
    setLightboxImage(src);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex].src);
  };

  return (
    <div className="min-h-screen bg-background font-open-sans">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal origin="top" distance="60px" duration={1000}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-cairo">
              {t('galleryTitle')}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300} origin="bottom" distance="40px" duration={800}>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              {t('gallerySubtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <ScrollReveal origin="top" distance="30px" duration={800}>
            <h2 className="text-2xl font-bold mb-6 text-primary text-center font-cairo">
              {t('photoCategories')}
            </h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance="20px" duration={700} delay={200}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <ScrollReveal key={category.id} delay={100 * index} origin="bottom" distance="10px" duration={500}>
                  <Button
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse ${
                      selectedCategory === category.id 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-primary/10"
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </Button>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <ScrollReveal 
              key={image.id} 
              delay={100 * (index % 4)} 
              origin={index % 2 === 0 ? "left" : "right"} 
              distance="30px" 
              duration={800}
              threshold={0.1}
            >
              <Card 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-accent/20"
                onClick={() => openLightbox(image.src, index)}
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-primary text-sm">
                    {image.title}
                  </h3>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {categories.find(cat => cat.id === image.category)?.name}
                  </Badge>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <ScrollReveal origin="bottom" distance="40px" duration={800}>
            <div className="text-center py-12">
              <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">{t('noImagesFound')}</h3>
              <p className="text-muted-foreground">{t('tryDifferentCategory')}</p>
            </div>
          </ScrollReveal>
        )}

        {/* Statistics */}
        <section className="mt-16">
          <ScrollReveal origin="bottom" distance="50px" duration={1000} delay={300}>
            <Card className="border-secondary/20 bg-gradient-to-r from-secondary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <ScrollReveal delay={100} origin="bottom" distance="20px" duration={700}>
                    <div>
                      <Camera className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">{t('photos')}</div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={200} origin="bottom" distance="20px" duration={700}>
                    <div>
                      <Building className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">50+</div>
                      <div className="text-sm text-muted-foreground">{t('facilities')}</div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={300} origin="bottom" distance="20px" duration={700}>
                    <div>
                      <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">{t('events')}</div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={400} origin="bottom" distance="20px" duration={700}>
                    <div>
                      <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-primary">1700+</div>
                      <div className="text-sm text-muted-foreground">{t('students')}</div>
                    </div>
                  </ScrollReveal>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </section>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 text-white border-white hover:bg-white hover:text-black"
            onClick={closeLightbox}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white border-white hover:bg-white hover:text-black"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white border-white hover:bg-white hover:text-black"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <img
            src={lightboxImage}
            alt={t('galleryImage')}
            className="max-w-full max-h-full object-contain"
          />
          
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-lg font-semibold">
              {filteredImages[lightboxIndex]?.title}
            </p>
            <p className="text-xs opacity-60 mt-1">
              {lightboxIndex + 1} / {filteredImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;