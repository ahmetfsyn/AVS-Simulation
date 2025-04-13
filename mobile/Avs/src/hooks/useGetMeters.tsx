import {useQuery} from '@tanstack/react-query';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {getMeters} from '../services/meterService';
import {setMetersRedux} from '../redux/slices/meterSlice';

export const useGetMeters = (params: any) => {
  const dispatch = useDispatch();
  const {subscriberNo, userId, accessToken} = params;

  const {data, error, isLoading} = useQuery({
    queryKey: ['useGetMeters', subscriberNo, accessToken],
    queryFn: ({queryKey}) => getMeters({queryKey}),
    enabled: !!userId && !!accessToken,
  });
  useEffect(() => {
    if (data) {
      dispatch(setMetersRedux(data));
    }
  }, [data, dispatch]);

  return {isLoading2: isLoading, error2: error};
};
