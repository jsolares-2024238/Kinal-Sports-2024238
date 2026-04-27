import { axiosAuth } from './api.js';

export const login = async (data) => {
  return await axiosAuth.post('login', data);
};

export const getAllUsers = async () => {
  const { data } = await axiosAuth.get('/users');
  return { users: data };
};

export const register = async (data) => {
  return await axiosAuth.post('/register', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const verifyEmail= async (token) => {
  return await axiosAuth.post('/verify-email', { token });
};