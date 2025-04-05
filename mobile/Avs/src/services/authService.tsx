import {AxiosError} from 'axios';
import {registrationErrorMessages} from '../errorMessages/RegistrationErrorMessages';
import {RegistrationFailedError} from '../errors/RegistrationFailedError';
import {LoginParams, RegisterParams} from '../models/types/AuthParams';
import {IdentityError} from '../models/types/IdentityError';
import api from './api';

export const register = async (formValues: RegisterParams): Promise<void> => {
  formValues.username = (
    formValues.firstName +
    formValues.lastName +
    Date.now()
  ).replaceAll(' ', '');
  console.log(formValues);
  try {
    await api.post('/api/auth', formValues);
    // await sendConfirmEmail(formValues.email);
  } catch (error: any) {
    console.error(error);
    const {ErrorList} = error?.response?.data;

    ErrorList.forEach((identityError: IdentityError) => {
      throw new RegistrationFailedError(
        registrationErrorMessages[identityError.Code] ||
          'Bilinmeyen bir hata oluştu.',
      );
    });
  }
};

export const login = async (values: LoginParams): Promise<void> => {
  try {
    const response = await api.post('/api/auth/login', values);

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error.message);
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

// const sendConfirmEmail = async (email: string) => {
//   try {
//     console.log('Emailinize onaylama linki gönderildi. ', email);
//   } catch (error) {
//     console.error(error);
//   }
// };
