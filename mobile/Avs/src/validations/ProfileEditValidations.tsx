import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir e-posta giriniz'),
  phoneNumber: Yup.string().matches(
    /^\d{10}$/,
    'Telefon numarası 10 haneli olmalıdır',
  ),
});
