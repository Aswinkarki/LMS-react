// src/services/AuthService.ts
import api from '../services/api'; // your axios instance
import { TokenService } from './TokenService';

export const AuthService = {
  silentRefresh: async () => {
    const refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token available');

    const response = await api.post('/users/refresh/', { refresh: refreshToken });
    const newAccessToken = response.data.access;
    TokenService.setAccessToken(newAccessToken);
  },
};
