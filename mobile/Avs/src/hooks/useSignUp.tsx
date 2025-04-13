import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormikHelpers} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {RegisterParams} from '../models/types/AuthParams';
import {showMessage} from '../utils/showMessage';
import {register} from '../services/authService';

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Başarıyla kayıt oldunuz.',
        type: 'success',
      });

      // E-posta dorulama maili göndereilbirisn

      // E-posta doğrulama mesajını ekleyebilirsin
      //   setTimeout(() => {
      //     showMessage({
      //       text1: 'Bilgilendirme',
      //       text2: 'Lütfen mail adresinizi kontrol ediniz.',
      //       type: 'info',
      //     });
      //   }, 4000);
    },
  });

  const signUp = async (
    values: RegisterParams,
    {resetForm}: FormikHelpers<any>,
  ): Promise<void> => {
    setLoading(true);
    try {
      await mutation.mutateAsync(values);

      resetForm();
      navigation.navigate('Login');
    } catch (error: any) {
      //   console.error(error);
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {signUp, loading};
};
