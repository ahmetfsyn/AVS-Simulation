import {useQuery} from '@tanstack/react-query';
import {getWaterCards} from '../services/waterCardService';
import {UseGetWaterCardsParams} from '../models/types/UseGetWaterCardsParams';
import {useDispatch, useSelector} from 'react-redux';
import {setWaterCardsRedux} from '../redux/slices/waterCardSlice';
import {useEffect} from 'react';
import {RootState} from '../redux/store';

export const useGetWaterCards = (params: UseGetWaterCardsParams) => {
  const dispatch = useDispatch();
  const {subscriberNo, userId} = params;

  const waterCards = useSelector(
    (state: RootState) => state.waterCard.waterCards,
  );

  const {
    data: fetchedWaterCards,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['useGetWaterCards', userId, subscriberNo],
    queryFn: () => getWaterCards({userId, subscriberNo}),
    enabled: !!userId && !!subscriberNo,
    // staleTime: 1000 * 60 * 5, // 5 dakika fresh sayılır
  });

  useEffect(() => {
    if (isSuccess && fetchedWaterCards) {
      dispatch(setWaterCardsRedux(fetchedWaterCards));
    }
  }, [isSuccess, fetchedWaterCards, dispatch]);

  return {loadingWaterCards: isLoading, error};
};
