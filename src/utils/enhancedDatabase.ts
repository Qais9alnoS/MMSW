// Enhanced unified database system using localStorage
export interface DatabaseSchema {
  enrollments: Enrollment[];
  news: NewsItem[];
  events: Event[];
  activities: Activity[];
  galleryImages: GalleryImage[];
  messages: Message[];
  notifications: Notification[];
  visits: {
    total: number;
    today: number;
    yesterday: number;
  };
  settings: Record<string, string | number | boolean>;
}

export interface Enrollment {
  id: string;
  studentName: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  previousSchool: string;
  message: string;
  agreeToTerms: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt?: string;
  responseMessage?: string;
}

export interface NewsItem {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  category: string;
  image?: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  date: string;
  location: string;
  image?: string;
  status: 'upcoming' | 'past';
  createdAt: string;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  image: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryImage {
  id: string;
  titleAr: string;
  titleEn: string;
  image: string;
  category: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
  updatedAt?: string;
  response?: string;
}

export interface Notification {
  id: string;
  type: 'enrollment_status' | 'new_message';
  title: string;
  message: string;
  recipient: string;
  isRead: boolean;
  createdAt: string;
}

// Categories extracted from existing hardcoded data
export const ACTIVITY_CATEGORIES = [
  'Academic',
  'Sports', 
  'Cultural',
  'Leadership',
  'Arts'
];

export const GALLERY_CATEGORIES = [
  'classrooms',
  'sports',
  'events',
  'activities',
  'facilities',
  'students'
];

export const NEWS_CATEGORIES = [
  'announcements',
  'achievements',
  'events',
  'updates'
];

// Sample data from existing hardcoded content
const initializeWithSampleData = (): DatabaseSchema => {
  const activities: Activity[] = [
    {
      id: '1',
      titleAr: 'معرض العلوم',
      titleEn: 'Science Fair',
      descriptionAr: 'عرض مبتكر لمشاريع العلوم من طلابنا الموهوبين',
      descriptionEn: 'Innovative science projects from our talented students',
      category: 'Academic',
      image: 'https://i.postimg.cc/cLvc8yd8/biology.png',
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      titleAr: 'اليوم الرياضي',
      titleEn: 'Sports Day',
      descriptionAr: 'فعاليات رياضية متنوعة لجميع المراحل',
      descriptionEn: 'Diverse sports activities for all grade levels',
      category: 'Sports',
      image: 'https://i.postimg.cc/CL94khmp/sports.png',
      status: 'active',
      createdAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '3',
      titleAr: 'المهرجان الثقافي',
      titleEn: 'Cultural Festival',
      descriptionAr: 'احتفال بالتراث والثقافة العربية',
      descriptionEn: 'Celebration of Arab heritage and culture',
      category: 'Cultural',
      image: 'https://i.postimg.cc/nnLxwddj/books.png',
      status: 'active',
      createdAt: '2024-01-25T10:00:00Z'
    },
    {
      id: '4',
      titleAr: 'نموذج الأمم المتحدة',
      titleEn: 'Model UN',
      descriptionAr: 'تجربة قيادة دبلوماسية للطلاب',
      descriptionEn: 'Diplomatic leadership experience for students',
      category: 'Leadership',
      image: 'https://i.postimg.cc/8CJT7bKb/mukhtarday.jpg',
      status: 'active',
      createdAt: '2024-02-01T10:00:00Z'
    },
    {
      id: '5',
      titleAr: 'عرض الموسيقى والفنون',
      titleEn: 'Music & Arts Showcase',
      descriptionAr: 'عرض مواهب طلابنا في الموسيقى والفنون',
      descriptionEn: 'Showcasing student talents in music and arts',
      category: 'Arts',
      image: 'https://i.postimg.cc/1zSFWjgP/art.png',
      status: 'active',
      createdAt: '2024-02-05T10:00:00Z'
    },
    {
      id: '6',
      titleAr: 'أولمبياد الرياضيات',
      titleEn: 'Math Olympiad',
      descriptionAr: 'مسابقة رياضيات للطلاب المتفوقين',
      descriptionEn: 'Mathematics competition for gifted students',
      category: 'Academic',
      image: 'https://i.postimg.cc/sgjmc653/chess.jpg',
      status: 'active',
      createdAt: '2024-02-10T10:00:00Z'
    }
  ];

  const news: NewsItem[] = [
    {
      id: '1',
      titleAr: 'افتتاح مختبر علوم جديد',
      titleEn: 'New Science Lab Opening',
      contentAr: 'تم افتتاح مختبر علوم حديث مجهز بأحدث التقنيات لطلابنا',
      contentEn: 'Opened a modern science lab equipped with latest technologies for our students',
      category: 'announcements',
      image: 'https://i.postimg.cc/0QWcMpz9/Arabic.png',
      status: 'published',
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      titleAr: 'فوز المدرسة في مسابقة المناظرة',
      titleEn: 'School Wins Debate Competition',
      contentAr: 'فاز طلابنا بالمركز الأول في مسابقة المناظرة على مستوى المحافظة',
      contentEn: 'Our students won first place in the governorate-level debate competition',
      category: 'achievements',
      image: 'https://i.postimg.cc/8CJT7bKb/mukhtarday.jpg',
      status: 'published',
      createdAt: '2024-01-12T10:00:00Z'
    },
    {
      id: '3',
      titleAr: 'توسعة مكتبة المدرسة',
      titleEn: 'School Library Expansion',
      contentAr: 'تم توسعة مكتبة المدرسة بإضافة 500 كتاب جديد',
      contentEn: 'School library expanded with 500 new books added',
      category: 'updates',
      image: 'https://i.postimg.cc/vBZdwtRy/lib.jpg',
      status: 'published',
      createdAt: '2024-01-18T10:00:00Z'
    }
  ];

  const galleryImages: GalleryImage[] = [
    {
      id: '1',
      titleAr: 'فصل رياض الأطفال',
      titleEn: 'Kindergarten Classroom',
      image: 'https://i.postimg.cc/FRxPVM1g/pclab.jpg',
      category: 'classrooms',
      status: 'active',
      createdAt: '2024-01-01T10:00:00Z'
    },
    {
      id: '2',
      titleAr: 'نشاط رياضي',
      titleEn: 'Sports Activity',
      image: 'https://i.postimg.cc/CL94khmp/sports.png',
      category: 'sports',
      status: 'active',
      createdAt: '2024-01-02T10:00:00Z'
    },
    {
      id: '3',
      titleAr: 'يوم المختار',
      titleEn: 'Mukhtar Day',
      image: 'https://i.postimg.cc/8CJT7bKb/mukhtarday.jpg',
      category: 'events',
      status: 'active',
      createdAt: '2024-01-03T10:00:00Z'
    },
    {
      id: '4',
      titleAr: 'حفل التخرج',
      titleEn: 'Graduation Ceremony',
      image: 'https://i.postimg.cc/0QWcMpz9/Arabic.png',
      category: 'events',
      status: 'active',
      createdAt: '2024-01-04T10:00:00Z'
    },
    {
      id: '5',
      titleAr: 'ورشة فنية',
      titleEn: 'Art Workshop',
      image: 'https://i.postimg.cc/1zSFWjgP/art.png',
      category: 'activities',
      status: 'active',
      createdAt: '2024-01-05T10:00:00Z'
    },
    {
      id: '6',
      titleAr: 'مكتبة المدرسة',
      titleEn: 'School Library',
      image: 'https://i.postimg.cc/vBZdwtRy/lib.jpg',
      category: 'facilities',
      status: 'active',
      createdAt: '2024-01-06T10:00:00Z'
    },
    {
      id: '7',
      titleAr: 'دراسة جماعية',
      titleEn: 'Group Study',
      image: 'https://i.postimg.cc/05TnFGJJ/students.jpg',
      category: 'students',
      status: 'active',
      createdAt: '2024-01-07T10:00:00Z'
    },
    {
      id: '8',
      titleAr: 'مختبر الكيمياء',
      titleEn: 'Chemistry Lab',
      image: 'https://i.postimg.cc/0QWcMpz9/Arabic.png',
      category: 'facilities',
      status: 'active',
      createdAt: '2024-01-08T10:00:00Z'
    },
    {
      id: '9',
      titleAr: 'معرض العلوم',
      titleEn: 'Science Fair',
      image: 'https://i.postimg.cc/cLvc8yd8/biology.png',
      category: 'events',
      status: 'active',
      createdAt: '2024-01-09T10:00:00Z'
    },
    {
      id: '10',
      titleAr: 'مختبر الحاسوب',
      titleEn: 'Computer Lab',
      image: 'https://i.postimg.cc/FRxPVM1g/pclab.jpg',
      category: 'facilities',
      status: 'active',
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '11',
      titleAr: 'تكامل التكنولوجيا',
      titleEn: 'Technology Integration',
      image: 'https://i.postimg.cc/386F0j1b/tech.jpg',
      category: 'classrooms',
      status: 'active',
      createdAt: '2024-01-11T10:00:00Z'
    },
    {
      id: '12',
      titleAr: 'حفل موسيقي',
      titleEn: 'Music Concert',
      image: 'https://i.postimg.cc/cCgsnBLW/image.png',
      category: 'activities',
      status: 'active',
      createdAt: '2024-01-12T10:00:00Z'
    }
  ];

  return {
    enrollments: [],
    news,
    events: [],
    activities,
    galleryImages,
    messages: [],
    notifications: [],
    visits: {
      total: 0,
      today: 0,
      yesterday: 0
    },
    settings: {
      schoolName: 'مدرسة المختار النموذجية',
      phone: '011-1234567',
      email: 'info@mukhtarschool.edu.sy'
    }
  };
};

class EnhancedDatabase {
  private storageKey = 'mukhtar_school_enhanced_db';

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase(): DatabaseSchema {
    const initialData = initializeWithSampleData();
    
    if (!localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialData));
    }
    
    return initialData;
  }

  private getData(): DatabaseSchema {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      return JSON.parse(data) as DatabaseSchema;
    } else {
      const initialData = initializeWithSampleData();
      return JSON.parse(localStorage.getItem(this.storageKey) || JSON.stringify(initialData)) as DatabaseSchema;
    }
  }

  private saveData(data: DatabaseSchema) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Enrollments
  getEnrollments(): Enrollment[] {
    return this.getData().enrollments;
  }

  getEnrollmentById(id: string): Enrollment | null {
    const data = this.getData();
    return data.enrollments.find((e: Enrollment) => e.id === id) || null;
  }

  addEnrollment(enrollment: Omit<Enrollment, 'id' | 'createdAt' | 'status'>): Enrollment {
    const data = this.getData();
    const newEnrollment: Enrollment = {
      ...enrollment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    data.enrollments.push(newEnrollment);
    this.saveData(data);
    return newEnrollment;
  }

  updateEnrollment(id: string, updates: Partial<Enrollment>): Enrollment | null {
    const data = this.getData();
    const index = data.enrollments.findIndex((e: Enrollment) => e.id === id);
    if (index !== -1) {
      data.enrollments[index] = {
        ...data.enrollments[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      
      // Create notification for status changes
      if (updates.status && updates.status !== data.enrollments[index].status) {
        this.addNotification({
          type: 'enrollment_status',
          title: 'تحديث حالة التسجيل',
          message: `تم ${updates.status === 'approved' ? 'قبول' : 'رفض'} طلب التسجيل`,
          recipient: data.enrollments[index].email,
          isRead: false
        });
      }
      return data.enrollments[index];
    }
    return null;
  }

  // Activities
  getActivities(): Activity[] {
    return this.getData().activities;
  }

  getActivityById(id: string): Activity | null {
    const data = this.getData();
    return data.activities.find((a: Activity) => a.id === id) || null;
  }

  addActivity(activity: Omit<Activity, 'id' | 'createdAt'>): Activity {
    const data = this.getData();
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    data.activities.push(newActivity);
    this.saveData(data);
    return newActivity;
  }

  updateActivity(id: string, updates: Partial<Activity>): Activity | null {
    const data = this.getData();
    const index = data.activities.findIndex((a: Activity) => a.id === id);
    if (index !== -1) {
      data.activities[index] = {
        ...data.activities[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.activities[index];
    }
    return null;
  }

  deleteActivity(id: string): boolean {
    const data = this.getData();
    const initialLength = data.activities.length;
    data.activities = data.activities.filter((a: Activity) => a.id !== id);
    if (data.activities.length < initialLength) {
      this.saveData(data);
      return true;
    }
    return false;
  }

  // News
  getNews(): NewsItem[] {
    return this.getData().news;
  }

  getNewsById(id: string): NewsItem | null {
    const data = this.getData();
    return data.news.find((n: NewsItem) => n.id === id) || null;
  }

  addNews(news: Omit<NewsItem, 'id' | 'createdAt'>): NewsItem {
    const data = this.getData();
    const newNews: NewsItem = {
      ...news,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    data.news.push(newNews);
    this.saveData(data);
    return newNews;
  }

  updateNews(id: string, updates: Partial<NewsItem>): NewsItem | null {
    const data = this.getData();
    const index = data.news.findIndex((n: NewsItem) => n.id === id);
    if (index !== -1) {
      data.news[index] = {
        ...data.news[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.news[index];
    }
    return null;
  }

  deleteNews(id: string): boolean {
    const data = this.getData();
    const initialLength = data.news.length;
    data.news = data.news.filter((n: NewsItem) => n.id !== id);
    if (data.news.length < initialLength) {
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Gallery
  getGalleryImages(): GalleryImage[] {
    return this.getData().galleryImages;
  }

  getGalleryImageById(id: string): GalleryImage | null {
    const data = this.getData();
    return data.galleryImages.find((g: GalleryImage) => g.id === id) || null;
  }

  addGalleryImage(image: Omit<GalleryImage, 'id' | 'createdAt'>): GalleryImage {
    const data = this.getData();
    const newImage: GalleryImage = {
      ...image,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    data.galleryImages.push(newImage);
    this.saveData(data);
    return newImage;
  }

  updateGalleryImage(id: string, updates: Partial<GalleryImage>): GalleryImage | null {
    const data = this.getData();
    const index = data.galleryImages.findIndex((g: GalleryImage) => g.id === id);
    if (index !== -1) {
      data.galleryImages[index] = {
        ...data.galleryImages[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.galleryImages[index];
    }
    return null;
  }

  deleteGalleryImage(id: string): boolean {
    const data = this.getData();
    const initialLength = data.galleryImages.length;
    data.galleryImages = data.galleryImages.filter((g: GalleryImage) => g.id !== id);
    if (data.galleryImages.length < initialLength) {
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Messages
  getMessages(): Message[] {
    return this.getData().messages;
  }

  getMessageById(id: string): Message | null {
    const data = this.getData();
    return data.messages.find((m: Message) => m.id === id) || null;
  }

  addMessage(message: Omit<Message, 'id' | 'createdAt' | 'status'>): Message {
    const data = this.getData();
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    data.messages.push(newMessage);
    this.saveData(data);
    
    // Create notification for new message
    this.addNotification({
      type: 'new_message',
      title: 'رسالة جديدة',
      message: `رسالة جديدة من ${message.name}`,
      recipient: 'admin@mukhtarschool.edu.sy',
      isRead: false
    });
    
    return newMessage;
  }

  updateMessage(id: string, updates: Partial<Message>): Message | null {
    const data = this.getData();
    const index = data.messages.findIndex((m: Message) => m.id === id);
    if (index !== -1) {
      data.messages[index] = {
        ...data.messages[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.saveData(data);
      return data.messages[index];
    }
    return null;
  }

  deleteMessage(id: string): boolean {
    const data = this.getData();
    const initialLength = data.messages.length;
    data.messages = data.messages.filter((m: Message) => m.id !== id);
    if (data.messages.length < initialLength) {
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Notifications
  getNotifications(): Notification[] {
    return this.getData().notifications;
  }

  addNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
    const data = this.getData();
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    data.notifications.push(newNotification);
    this.saveData(data);
    return newNotification;
  }

  markNotificationAsRead(id: string): boolean {
    const data = this.getData();
    const notification = data.notifications.find((n: Notification) => n.id === id);
    if (notification) {
      notification.isRead = true;
      this.saveData(data);
      return true;
    }
    return false;
  }

  // Settings
  getSettings(): Record<string, string | number | boolean> {
    return this.getData().settings;
  }

  updateSettings(settings: Record<string, string | number | boolean>): void {
    const data = this.getData();
    data.settings = { ...data.settings, ...settings };
    this.saveData(data);
  }
}

export const enhancedDB = new EnhancedDatabase();