import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (username: string, password: string) =>
    api.post('/auth/register', { username, password }),

  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
};
export const apiLogin = async (email: string, _password: string) => {
  return new Promise<{ user: string; token: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        user: email,
        token: 'mock-jwt-token-' + Math.random().toString(36).substring(7),
      });
    }, 500);
  });
};

export const apiRegister = async (email: string, _password: string) => {
  return apiLogin(email, _password);
};

export const sendMessage = async (message: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`This is a mock response to: "${message}"`);
    }, 1000);
  });
};
