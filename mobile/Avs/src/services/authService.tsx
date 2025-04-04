import {registrationErrorMessages} from '../enums/RegistrationErrorMessages';
import {RegistrationFailedError} from '../errors/RegistrationFailedError';
import {RegisterParams} from '../models/types/AuthParams';
import api from './api';

export const register = async (formValues: RegisterParams): Promise<void> => {
  formValues.roles = ['User'];

  formValues.username = (
    formValues.firstName +
    formValues.lastName +
    Date.now()
  ).replaceAll(' ', '');

  try {
    await api.post('/api/auth', formValues);

    await sendConfirmEmail(formValues.email);
  } catch (error: any) {
    const {ErrorList} = error?.response?.data;

    console.error('error list: ', ErrorList);

    ErrorList.forEach((identityError: any) => {
      throw new RegistrationFailedError(
        registrationErrorMessages[identityError.Code] ||
          'Bilinmeyen bir hata oluştu.',
      );
    });
  }
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

const sendConfirmEmail = async (email: string) => {
  try {
    console.log('Emailinize onaylama linki gönderildi. ', email);
  } catch (error) {
    console.error(error);
  }
};
