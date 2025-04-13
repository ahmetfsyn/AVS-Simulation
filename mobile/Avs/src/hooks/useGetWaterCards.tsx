import {useQuery} from '@tanstack/react-query';
import {getWaterCards} from '../services/waterCardService';
import {UseGetWaterCardsParams} from '../models/types/UseGetWaterCardsParams';
import {useDispatch} from 'react-redux';
import {setWaterCardsRedux} from '../redux/slices/waterCardSlice';
import {useEffect} from 'react';

export const useGetWaterCards = (params: UseGetWaterCardsParams) => {
  const dispatch = useDispatch();
  const {subscriberNo, userId} = params;

  const {data, error, isLoading} = useQuery({
    queryKey: ['useGetWaterCards', userId, subscriberNo],
    queryFn: ({queryKey}) => getWaterCards({queryKey}),
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setWaterCardsRedux(data));
    }
  }, [data, dispatch]);

  return {isLoading, error};
};
