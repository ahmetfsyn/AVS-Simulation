import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {LoginParams} from '../models/types/AuthParams';
import {login} from '../services/authService';
import {useMutation} from '@tanstack/react-query';
import {showMessage} from '../utils/showMessage';
import {useGetMeters} from './useGetMeters';
import {setMetersRedux} from '../redux/slices/meterSlice';
import {useGetCityHall} from './useGetCityHall';
import {setCityHallRedux} from '../redux/slices/appSlice';
import {setUserRedux} from '../redux/slices/userSlice';
import {setCredentialsRedux} from '../redux/slices/authSlice';
import {useGetWaterCards} from './useGetWaterCards';
import {setWaterCardsRedux} from '../redux/slices/waterCardSlice';

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {fetchMeters} = useGetMeters();
  const {fetchCityHall} = useGetCityHall();
  const {fetchWaterCards} = useGetWaterCards();

  const mutation = useMutation({
    mutationFn: login,
  });
  const signIn = async (values: LoginParams): Promise<void> => {
    setLoading(true);
    try {
      const {userDto, tokenDto} = (await mutation.mutateAsync(values)).data;
      dispatch(setCredentialsRedux(tokenDto));
      dispatch(setUserRedux(userDto));

      const resultMeters = await fetchMeters(userDto.subscriberNo!);
      dispatch(setMetersRedux(resultMeters!));

      const resultCityHall = await fetchCityHall();
      dispatch(setCityHallRedux(resultCityHall));

      const resultWaterCards = await fetchWaterCards({
        userId: userDto?.id,
        subscriberNo: userDto?.subscriberNo,
      });
      dispatch(setWaterCardsRedux(resultWaterCards));

      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Başarıyla giriş yaptınız.',
        type: 'success',
      });
    } catch (error: any) {
      console.error(error);
      showMessage({
        text1: 'İşlem Başarısız',
        text2: 'Giriş yapılırken bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {signIn, loading};
};
