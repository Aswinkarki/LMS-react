// import axios, {
//   AxiosError,
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from "axios";

// const API_URL = "http://127.0.0.1:8000";

// const api: AxiosInstance = axios.create({
//   baseURL: API_URL,
// });

// // Request Interceptor
// api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const token = localStorage.getItem("accessToken");
//   if (token && config.headers) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Refresh Queue Handling
// interface FailedRequest {
//   resolve: (value?: unknown) => void;
//   reject: (reason?: unknown) => void;
// }

// let isRefreshing = false;
// let failedQueue: FailedRequest[] = [];

// const processQueue = (error: unknown, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error: AxiosError): Promise<AxiosResponse | unknown> => {
//     const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
//     const status = error.response?.status;

//     if ((status === 401 || status === 403) && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             if (originalRequest.headers && typeof token === "string") {
//               originalRequest.headers.Authorization = `Bearer ${token}`;
//             }
//             return api(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       isRefreshing = true;
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (!refreshToken) {
//         window.location.href = "/login";
//         return Promise.reject(error);
//       }

//       try {
//         const response = await axios.post(`${API_URL}/users/token/refresh/`, {
//           refresh: refreshToken,
//         });

//         const newAccessToken = response.data.access;
//         localStorage.setItem("accessToken", newAccessToken);
//         api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
let isRefreshing = false;
let failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (originalRequest.headers && typeof token === 'string') {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_URL}/users/token/refresh/`, { refresh: refreshToken });
        const newAccessToken = response.data.access;

        localStorage.setItem('accessToken', newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        redirectToLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

function redirectToLogin() {
  localStorage.clear();
  window.location.href = '/login';
}

export default api;
