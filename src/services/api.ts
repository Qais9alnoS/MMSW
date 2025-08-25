import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Enrollment API
export const enrollmentApi = {
  // Submit enrollment request
  submitEnrollment: async (enrollmentData: any) => {
    try {
      const response = await api.post('/enrollments', enrollmentData);
      return response.data;
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      throw error;
    }
  },

  // Get all enrollment requests
  getAllEnrollments: async () => {
    try {
      const response = await api.get('/enrollments');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      throw error;
    }
  },

  // Update enrollment status
  updateEnrollmentStatus: async (id: string, status: string) => {
    try {
      const response = await api.patch(`/enrollments/${id}`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating enrollment status:', error);
      throw error;
    }
  },

  // Delete enrollment request
  deleteEnrollment: async (id: string) => {
    try {
      const response = await api.delete(`/enrollments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting enrollment:', error);
      throw error;
    }
  },
};

// News API
export const newsApi = {
  // Get all news
  getAllNews: async () => {
    try {
      const response = await api.get('/news');
      return response.data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  // Create new news
  createNews: async (newsData: any) => {
    try {
      const response = await api.post('/news', newsData);
      return response.data;
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  },

  // Update news
  updateNews: async (id: string, newsData: any) => {
    try {
      const response = await api.patch(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  },

  // Delete news
  deleteNews: async (id: string) => {
    try {
      const response = await api.delete(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting news:', error);
      throw error;
    }
  },
};

// Events API
export const eventsApi = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Create new event
  createEvent: async (eventData: any) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update event
  updateEvent: async (id: string, eventData: any) => {
    try {
      const response = await api.patch(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (id: string) => {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
};

// Settings API
export const settingsApi = {
  // Get all settings
  getAllSettings: async () => {
    try {
      const response = await api.get('/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },

  // Update settings
  updateSettings: async (settingsData: any) => {
    try {
      const response = await api.patch('/settings', settingsData);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },
};

// Analytics API
export const analyticsApi = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get website visits
  getWebsiteVisits: async () => {
    try {
      const response = await api.get('/analytics/visits');
      return response.data;
    } catch (error) {
      console.error('Error fetching website visits:', error);
      throw error;
    }
  },

  // Get enrollment statistics
  getEnrollmentStats: async () => {
    try {
      const response = await api.get('/analytics/enrollments');
      return response.data;
    } catch (error) {
      console.error('Error fetching enrollment stats:', error);
      throw error;
    }
  },
};

// Auth API
export const authApi = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },
};

export default api;