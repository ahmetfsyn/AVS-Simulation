import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getMeters} from '../services/meterService';

export const useGetMeters = () => {
  const queryClient = useQueryClient();

  const fetchMeters = async (subscriberNo: string) => {
    if (!subscriberNo) {
      return;
    }

    return await queryClient.fetchQuery({
      queryKey: ['useGetMeters', subscriberNo],
      queryFn: () => getMeters(subscriberNo),
    });
  };

  return {
    fetchMeters,
  };
};
