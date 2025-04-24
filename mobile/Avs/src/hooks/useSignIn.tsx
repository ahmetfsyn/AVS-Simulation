import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoginParams} from '../models/types/AuthParams';
import {login} from '../services/authService';
import {useMutation} from '@tanstack/react-query';
import {showMessage} from '../utils/showMessage';
import {setCredentials} from '../redux/slices/authSlice';
import {useGetMeters} from './useGetMeters';
import {setMetersRedux} from '../redux/slices/meterSlice';
import {useGetCityHall} from './useGetCityHall';
import {setCityHallRedux} from '../redux/slices/appSlice';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {fetchMeters} = useGetMeters();
  const {fetchCityHall} = useGetCityHall();

  const mutation = useMutation({
    mutationFn: login,
  });
  const signIn = async (
    values: LoginParams,
    // {resetForm}: FormikHelpers<any>,
  ): Promise<void> => {
    setLoading(true);
    try {
      const resultLogin = await mutation.mutateAsync(values);
      dispatch(setCredentials(resultLogin.data));
      // console.log(resultLogin.data);

      const resultMeters = await fetchMeters(
        resultLogin.data.userDto.subscriberNo!,
      );
      dispatch(setMetersRedux(resultMeters!));

      const resultCityHall = await fetchCityHall();
      dispatch(setCityHallRedux(resultCityHall));

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
