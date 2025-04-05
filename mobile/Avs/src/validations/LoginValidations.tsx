import * as Yup from 'yup';
import {passwordMaxLength, passwordMinLength} from './RegisterValidations';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Lütfen geçerli bir email adresi giriniz.')
    .required('Lütfen emailinizi giriniz.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(passwordMinLength, 'Şifreniz en az 6 karakter olmalıdır.')
    .max(passwordMaxLength, 'Şifreniz en fazla 24 karakter olmalıdır.'),
});
