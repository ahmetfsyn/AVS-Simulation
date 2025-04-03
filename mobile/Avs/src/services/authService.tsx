import {RegisterParams} from '../models/types/AuthParams';
import api from './api';

export const register = async (values: RegisterParams) => {
  values.roles = ['User'];
  values.username = values.email;

  console.log('values', values);

  const response = await api.post('/api/auth', values);
  console.log(response.data);
  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', {email, password});

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Çıkış sırasında hata:', error);
  }
};
