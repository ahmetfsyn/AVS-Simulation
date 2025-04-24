import {useQueryClient} from '@tanstack/react-query';
import {getCityHall} from '../services/appService';

export const useGetCityHall = () => {
  const queryClient = useQueryClient();

  const fetchCityHall = async () => {
    return await queryClient.fetchQuery({
      queryKey: ['useGetCityHall'],
      queryFn: () => getCityHall(),
      staleTime: 1000 * 60 * 60,
    });
  };
  return {fetchCityHall};
};
