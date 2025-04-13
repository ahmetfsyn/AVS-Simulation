import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoginParams} from '../models/types/AuthParams';
import {login} from '../services/authService';
import {useMutation} from '@tanstack/react-query';
import {FormikHelpers} from 'formik';
import {showMessage} from '../utils/showMessage';
import {setCredentials} from '../redux/slices/authSlice';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: login,
  });
  const signIn = async (
    values: LoginParams,
    {resetForm}: FormikHelpers<any>,
  ): Promise<void> => {
    setLoading(true);
    try {
      const result = await mutation.mutateAsync(values);

      dispatch(setCredentials(result.data));
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Başarıyla giriş yaptınız.',
        type: 'success',
      });

      //   resetForm();
    } catch (error: any) {
      console.error(error);
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error.message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {signIn, loading};
};
