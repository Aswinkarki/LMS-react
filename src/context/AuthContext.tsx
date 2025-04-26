

// import React, { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';
// import axios, { AxiosInstance } from 'axios';
// // instead of creating a new one


// // Types
// interface User {
//   username: string;
//   userId: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (username: string, password: string) => Promise<void>;
//   logout: () => void;
//   api: AxiosInstance;
// }

// // Create Context
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Axios Instance with Base URL
// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/',
// });

// // Auth Provider Component
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   // Check authentication on mount
//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const username = localStorage.getItem('username');
//     const userId = localStorage.getItem('userId');

//     if (accessToken && username && userId) {
//       setUser({ username, userId });
//       setIsAuthenticated(true);
//     }
//   }, []);

//   // Token management
//   useEffect(() => {
//     const interceptor = api.interceptors.request.use(
//       (config) => {
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//           config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error)
//     );

//     const responseInterceptor = api.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           try {
//             const newToken = await refreshToken();
//             originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//             return api(originalRequest);
//           } catch (refreshError) {
//             logout();
//             return Promise.reject(refreshError);
//           }
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => {
//       api.interceptors.request.eject(interceptor);
//       api.interceptors.response.eject(responseInterceptor);
//     };
//   }, []);

//   // Login Method
//   const login = async (username: string, password: string) => {
//     try {
//       const response = await api.post('users/login/', {
//         user_name: username,
//         password: password,
//       });

//       const { access_token, refresh_token, user_id } = response.data;

//       localStorage.setItem('accessToken', access_token);
//       localStorage.setItem('refreshToken', refresh_token);
//       localStorage.setItem('username', username);
//       localStorage.setItem('userId', user_id);

//       setUser({ username, userId: user_id });
//       setIsAuthenticated(true);
//     } catch (error: any) {
//       logout();
//       throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
//     }
//   };

//   // Logout Method
//   const logout = () => {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('refreshToken');
//     localStorage.removeItem('username');
//     localStorage.removeItem('userId');

//     setUser(null);
//     setIsAuthenticated(false);
//   };

//   // Token Refresh Method
//   const refreshToken = async () => {
//     try {
//       const refreshToken = localStorage.getItem('refreshToken');
//       if (!refreshToken) {
//         throw new Error('No refresh token');
//       }

//       const response = await api.post('users/token/refresh/', {
//         refresh: refreshToken,
//       });

//       const newAccessToken = response.data.access;
//       localStorage.setItem('accessToken', newAccessToken);
//       return newAccessToken;
//     } catch (error) {
//       logout();
//       throw error;
//     }
//   };

//   // Memoized Context Value
//   const contextValue = useMemo(
//     () => ({
//       user,
//       isAuthenticated,
//       login,
//       logout,
//       api,
//     }),
//     [user, isAuthenticated]
//   );

//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom Hook for Auth Context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export { api };

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import api from '../services/api'; // ✅ use single api

interface User {
  username: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if (accessToken && username && userId) {
      setUser({ username, userId });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('users/login/', {
        user_name: username,
        password: password,
      });

      const { access_token, refresh_token, user_id } = response.data;

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', user_id);

      setUser({ username, userId: user_id });
      setIsAuthenticated(true);
    } catch (error: any) {
      logout();
      throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
