// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Include cookies for session
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ msg: 'Unknown error' }));
      throw new Error(error.msg || `HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Auth APIs
export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiCall('/auth/logout', {
      method: 'POST',
    }),

  me: () =>
    apiCall('/auth/me', {
      method: 'GET',
    }),
};

// Film APIs
export const filmAPI = {
  // Get all films with pagination
  getAllFilms: (page = 1, limit = 10) =>
    apiCall(`/films?page=${page}&limit=${limit}`, {
      method: 'GET',
    }),

  // Search films by term
  searchFilms: (term, page = 1) =>
    apiCall(`/films/search?term=${encodeURIComponent(term)}&page=${page}`, {
      method: 'GET',
    }),

  // Get film detail
  getFilmDetail: (id) =>
    apiCall(`/films/detail/${id}`, {
      method: 'GET',
    }),

  // Get films by genre
  getFilmsByGenre: (genre, page = 1) =>
    apiCall(`/films/genre/${encodeURIComponent(genre)}?page=${page}`, {
      method: 'GET',
    }),

  // Get films by year
  getFilmsByYear: (year, page = 1) =>
    apiCall(`/films/year/${year}?page=${page}`, {
      method: 'GET',
    }),
};

// Dashboard APIs
export const dashboardAPI = {
  // Get marketing dashboard data
  getMarketingDashboard: () =>
    apiCall('/dashboard/marketing', {
      method: 'GET',
    }),

  // Get executive dashboard data
  getExecutiveDashboard: () =>
    apiCall('/dashboard/executive', {
      method: 'GET',
    }),
};
