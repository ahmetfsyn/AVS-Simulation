import * as Yup from 'yup';
import {
  passwordMaxLength,
  tcNoLength,
  passwordMinLength,
} from './RegisterValidations';

export const validationSchema = Yup.object({
  tcKimlikNo: Yup.string()
    .required('Lütfen T.C kimlik numaranızı giriniz.')
    .length(tcNoLength, 'T.C kimlik numarası 11 haneli olmalıdır.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(passwordMinLength)
    .max(passwordMaxLength),
});
