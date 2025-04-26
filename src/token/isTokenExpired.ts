// src/utils/isTokenExpired.ts
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
