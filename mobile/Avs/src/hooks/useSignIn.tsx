import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoginParams} from '../models/types/AuthParams';
import {login} from '../services/authService';
import {useMutation} from '@tanstack/react-query';
import {FormikHelpers} from 'formik';
import {showMessage} from '../utils/showMessage';

export const useSignIn = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: login,
  });
  const signIn = async (
    values: LoginParams,
    {resetForm}: FormikHelpers<any>,
  ): Promise<void> => {
    setLoading(true);
    try {
      await mutation.mutateAsync(values);

      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Başarıyla giriş yaptınız.',
        type: 'success',
      });
      navigation.navigate('App');

      //   resetForm();
    } catch (error) {
      //   console.error(error);
    } finally {
      setLoading(false);
    }

    // navigate('App');
  };

  return {signIn, loading};
};
