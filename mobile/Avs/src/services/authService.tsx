import {registrationErrorMessages} from '../errorMessages/RegistrationErrorMessages';
import {RegistrationFailedError} from '../errors/RegistrationFailedError';
import {loginErrorMessages} from '../errorMessages/LoginErrorMessages';
import {LoginFailedError} from '../errors/LoginFailedError';
import {LoginParams, RegisterParams} from '../models/types/AuthParams';
import {IdentityError} from '../models/types/IdentityError';
import api from './api';

export const register = async (formValues: RegisterParams): Promise<void> => {
  formValues.username = (
    formValues.firstName +
    formValues.lastName +
    Date.now()
  ).replaceAll(' ', '');
  // console.log(formValues);
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

export const login = async (values: LoginParams): Promise<any> => {
  try {
    const response = await api.post('/api/auth/login', values);
    return {data: response.data, remmeberMe: values.rememberMe};
  } catch (error: any) {
    console.error(error);
    const {ErrorList} = error?.response?.data;
    // console.log(error?.response?.data);
    ErrorList.forEach((identityError: IdentityError) => {
      throw new LoginFailedError(
        loginErrorMessages[identityError.Code] || 'Bilinmeyen bir hata oluştu.',
      );
    });
  }
};

export const refreshUserToken = async (tokenDto: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const response = await api.post('/api/auth/refresh-token', tokenDto);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// const sendConfirmEmail = async (email: string) => {
//   try {
//     console.log('Emailinize onaylama linki gönderildi. ', email);
//   } catch (error) {
//     console.error(error);
//   }
// };
