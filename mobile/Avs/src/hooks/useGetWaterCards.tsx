import {useQuery} from '@tanstack/react-query';
import {getWaterCards} from '../services/waterCardService';
import {UseGetWaterCardsParams} from '../models/types/UseGetWaterCardsParams';
import {useDispatch} from 'react-redux';
import {setWaterCards} from '../redux/slices/waterCardSlice';
import {IWaterCard} from '../models/WaterCard';

export const useGetWaterCards = (params: UseGetWaterCardsParams) => {
  const dispatch = useDispatch();

  const {userId, accessToken} = params;

  const {data, error, isLoading} = useQuery({
    queryKey: ['useGetWaterCards', userId, accessToken],
    queryFn: getWaterCards,
    enabled: !!userId && !!accessToken,
  });

  if (data !== undefined) {
    dispatch(setWaterCards(data));
  }
  return {isLoading};
};
