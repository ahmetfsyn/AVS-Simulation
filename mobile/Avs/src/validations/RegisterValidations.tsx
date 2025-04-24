import * as Yup from 'yup';

export const tcNoLength = 11;
export const passwordMaxLength = 24;
export const passwordMinLength = 6;

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Lütfen adınızı giriniz.').min(3).max(24),
  lastName: Yup.string().required('Lütfen soyadınızı giriniz.').min(2).max(24),
  // email: Yup.string()
  //   .email('Lütfen geçerli bir email adresi giriniz.')
  //   .required('Lütfen emailinizi giriniz.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(
      passwordMinLength,
      `Şifreniz en az ${passwordMinLength} karakter olmalıdır.`,
    )
    .max(
      passwordMaxLength,
      `Şifreniz en fazla ${passwordMaxLength} karakter olmalıdır.`,
    )
    .matches(/[A-Z]/, 'Şifreniz en az bir büyük harf içermelidir.')
    .matches(/[a-z]/, 'Şifreniz en az bir küçük harf içermelidir.')
    .matches(/\d/, 'Şifreniz en az bir rakam içermelidir.')
    .matches(/[^a-zA-Z0-9]/, 'Şifreniz en az bir özel karakter içermelidir.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Parolalar eşleşmiyor.')
    .required('Lütfen parolanızı tekrar giriniz.'),
  tcNo: Yup.string()
    .required('Lütfen T.C kimlik numaranızı giriniz.')
    .length(tcNoLength, 'T.C kimlik numarası 11 haneli olmalıdır.'),
});
