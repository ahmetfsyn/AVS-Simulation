import {useMutation} from '@tanstack/react-query';
import {addWaterCard} from '../services/waterCardService';

export const useAddWaterCard = () => {
  const mutation = useMutation({
    mutationFn: addWaterCard,
  });

  const addWaterCardAsync = async () => {};
};

export default useAddWaterCard;
