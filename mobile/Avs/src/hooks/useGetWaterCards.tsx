import {useQueryClient} from '@tanstack/react-query';
import {getWaterCards} from '../services/waterCardService';

export const useGetWaterCards = () => {
  const queryClient = useQueryClient();

  const fetchWaterCards = async ({userId, subscriberNo}: any) => {
    return await queryClient.fetchQuery({
      queryKey: ['useGetWaterCards'],
      queryFn: () =>
        getWaterCards({
          userId,
        }),
    });
  };

  return {fetchWaterCards};
};
