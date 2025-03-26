import * as Yup from 'yup';

export const tcNoLength = 11;
export const passwordMaxLength = 24;
export const passwordMinLength = 6;

export const validationSchema = Yup.object({
  firstName: Yup.string().required('Lütfen adınızı giriniz.'),
  lastName: Yup.string().required('Lütfen soyadınızı giriniz.'),
  tcNo: Yup.string()
    .required('Lütfen T.C kimlik numaranızı giriniz.')
    .length(tcNoLength, 'T.C kimlik numarası 11 haneli olmalıdır.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(passwordMinLength)
    .max(passwordMaxLength),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Parolalar eşleşmiyor.')
    .required('Lütfen parolanızı tekrar giriniz.'),
});
