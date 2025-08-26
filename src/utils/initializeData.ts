// Initialize sample data for the admin dashboard
export const initializeAdminData = () => {
  // Initialize enrollments
  if (!localStorage.getItem('enrollments')) {
    const sampleEnrollments = [
      {
        id: '1',
        studentName: 'أحمد محمد',
        studentNameEn: 'Ahmed Mohamed',
        parentName: 'محمد أحمد',
        parentNameEn: 'Mohamed Ahmed',
        email: 'parent@example.com',
        phone: '+966501234567',
        grade: 'الصف الأول',
        gradeEn: 'Grade 1',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        notes: 'يرغب في الانضمام للصف الأول الابتدائي'
      }
    ];
    localStorage.setItem('enrollments', JSON.stringify(sampleEnrollments));
  }

  // Initialize news
  if (!localStorage.getItem('news')) {
    const sampleNews = [
      {
        id: '1',
        title: 'افتتاح العام الدراسي الجديد',
        titleEn: 'New Academic Year Opening',
        content: 'نرحب بجميع طلابنا الأعزاء في العام الدراسي الجديد 2024-2025',
        contentEn: 'Welcome all our dear students to the new academic year 2024-2025',
        image: 'https://i.postimg.cc/Zn5FwDM0/school.png',
        date: new Date().toISOString(),
        category: 'عام',
        categoryEn: 'General'
      }
    ];
    localStorage.setItem('news', JSON.stringify(sampleNews));
  }

  // Initialize events
  if (!localStorage.getItem('events')) {
    const sampleEvents = [
      {
        id: '1',
        title: 'يوم المختار',
        titleEn: 'Mukhtar Day',
        description: 'احتفال سنوي بمناسبة تأسيس المدرسة',
        descriptionEn: 'Annual celebration of the school founding',
        date: new Date().toISOString(),
        time: '09:00',
        location: 'قاعة المدرسة',
        locationEn: 'School Hall',
        image: 'https://i.postimg.cc/8CJT7bKb/mukhtarday.jpg'
      }
    ];
    localStorage.setItem('events', JSON.stringify(sampleEvents));
  }

  // Initialize gallery
  if (!localStorage.getItem('gallery')) {
    const sampleGallery = [
      {
        id: '1',
        title: 'الطلاب في الفصل',
        titleEn: 'Students in Class',
        image: 'https://i.postimg.cc/G2CHFNsQ/class.png',
        description: 'طلابنا في بيئة تعليمية ممتعة',
        descriptionEn: 'Our students in an engaging learning environment',
        category: 'فصول دراسية',
        categoryEn: 'Classrooms'
      }
    ];
    localStorage.setItem('gallery', JSON.stringify(sampleGallery));
  }

  // Initialize pricing
  if (!localStorage.getItem('pricing')) {
    const samplePricing = [
      {
        id: '1',
        name: 'رياض الأطفال',
        nameEn: 'Kindergarten',
        price: 15000,
        features: ['تعليم ممتع', 'أنشطة ترفيهية', 'رعاية كاملة'],
        featuresEn: ['Fun learning', 'Entertainment activities', 'Full care'],
        isActive: true
      }
    ];
    localStorage.setItem('pricing', JSON.stringify(samplePricing));
  }

  // Initialize settings
  if (!localStorage.getItem('schoolSettings')) {
    const sampleSettings = {
      schoolName: 'مدرسة المختار الخاصة',
      schoolDescription: 'مدرسة رائدة في التعليم الحديث تقدم مناهج متطورة وبيئة تعليمية متميزة',
      email: 'info@mukhtarschool.com',
      phone: '+966501234567',
      address: 'حي النرجس، الرياض، المملكة العربية السعودية',
      website: 'https://mukhtarschool.com',
      logoUrl: 'https://i.postimg.cc/bJJWZVVC/logoM.png',
      primaryColor: '#2563eb',
      secondaryColor: '#f59e0b',
      enableOnlineEnrollment: true,
      enableNotifications: true,
      enableNewsletter: false,
      facebookUrl: 'https://facebook.com/mukhtarschool',
      instagramUrl: 'https://instagram.com/mukhtarschool',
      twitterUrl: 'https://twitter.com/mukhtarschool'
    };
    localStorage.setItem('schoolSettings', JSON.stringify(sampleSettings));
  }

  // Initialize messages
  if (!localStorage.getItem('messages')) {
    localStorage.setItem('messages', JSON.stringify([]));
  }

  // Initialize website visits
  if (!localStorage.getItem('websiteVisits')) {
    localStorage.setItem('websiteVisits', '0');
  }
};