import api from './api';

// Mock responses for development
const MOCK = true;

const mockUser = {
  id: 1,
  full_name: 'Alex Morgan',
  username: 'alexmorgan',
  email: 'alex@clarion.io',
  is_verified: true,
};

export const authService = {
  async login(credentials: { username: string; password: string }) {
    if (MOCK) {
      return { access_token: 'mock-jwt-token-clarion', user: mockUser };
    }
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  async register(userData: { full_name: string; username: string; email: string; password: string }) {
    if (MOCK) return { message: 'Verify your email', user_id: 1 };
    const { data } = await api.post('/auth/register', userData);
    return data;
  },

  async verifyOTP(payload: { user_id: number; otp_code: string }) {
    if (MOCK) return { message: 'Email verified successfully' };
    const { data } = await api.post('/auth/verify-otp', payload);
    return data;
  },

  async forgotPassword(email: string) {
    if (MOCK) return { message: 'OTP sent to email' };
    const { data } = await api.post('/auth/forgot-password', { email });
    return data;
  },

  async resetPassword(payload: { email: string; otp_code: string; new_password: string }) {
    if (MOCK) return { message: 'Password reset successfully' };
    const { data } = await api.post('/auth/reset-password', payload);
    return data;
  },
};
