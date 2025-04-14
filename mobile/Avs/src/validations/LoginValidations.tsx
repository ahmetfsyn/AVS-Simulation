import * as Yup from 'yup';
import {
  passwordMaxLength,
  passwordMinLength,
  tcNoLength,
} from './RegisterValidations';

export const validationSchema = Yup.object({
  email: Yup.string()
    .email('Lütfen geçerli bir email adresi giriniz.')
    .required('Lütfen emailinizi giriniz.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(passwordMinLength, 'Şifreniz en az 6 karakter olmalıdır.')
    .max(passwordMaxLength, 'Şifreniz en fazla 24 karakter olmalıdır.'),
  //  ! eğer email yerine tcNo ile giriş yapmak istenirse alttaki yorum satırını kaldır.
  // tcNo: Yup.string()
  //   .required('Lütfen Tc Kimlik Numaranızı Giriniz.')
  //   .length(tcNoLength , 'T.C kimlik numarası 11 haneli olmalıdır.'),
});
