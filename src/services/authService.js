import axios from 'axios';

const API_BASE_URL = process.env.VITE_API_URL || 'https://api.bcwildwatch.co.za';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

//tok req
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // ms login
  loginWithMicrosoft: () => {
    const redirectUri = encodeURIComponent(process.env.VITE_REDIRECT_URI);
    const clientId = process.env.VITE_MICROSOFT_CLIENT_ID;
    const tenantId = process.env.VITE_MICROSOFT_TENANT_ID;
    
    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`;
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid profile email',
      response_mode: 'query',
    });
    
    window.location.href = `${authUrl}?${params}`;
  },

  // Handle callback after Microsoft login
  handleCallback: async (code) => {
    try {
      const response = await authAPI.post('/microsoft/callback', { code });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data.user;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await authAPI.post('/refresh');
      localStorage.setItem('authToken', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.logout();
      throw error;
    }
  },
};

export default authService;
