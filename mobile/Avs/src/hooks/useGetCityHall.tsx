import {useQuery} from '@tanstack/react-query';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {setCityHallRedux} from '../redux/slices/appSlice';
import {getCityHall} from '../services/appService';
import {RootState} from '../redux/store';

export const useGetCityHall = () => {
  const dispatch = useDispatch();
  //   const {cityHallId} = params;

  const cityHall = useSelector((state: RootState) => state.app.cityHall);

  const {data, error, isLoading} = useQuery({
    queryKey: ['useGetCityHall'],
    queryFn: getCityHall,
    enabled: cityHall === null,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCityHallRedux(data));
    }
  }, [data, dispatch]);

  return {useGetCityHallError: error};
};
