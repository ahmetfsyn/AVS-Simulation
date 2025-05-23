import {useMutation} from '@tanstack/react-query';
import {deleteWaterCard} from '../services/waterCardService';
import {DeleteWaterCardParams} from '../models/types/DeleteWaterCardParams';
import {useState} from 'react';
import {showMessage} from '../utils/showMessage';
import {useDispatch, useSelector} from 'react-redux';
import {removeWaterCardRedux} from '../redux/slices/waterCardSlice';
import {RootState} from '../redux/store';
import {removeMeterRedux} from '../redux/slices/meterSlice';

export const useDeleteWaterCard = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const meters = useSelector((state: RootState) => state?.meter?.meters);
  const mutation = useMutation({
    mutationFn: (params: DeleteWaterCardParams) => deleteWaterCard(params),
  });

  const removeWaterCardAsync = async (params: DeleteWaterCardParams) => {
    const {waterCard} = params;
    setLoading(true);
    try {
      const result = await mutation.mutateAsync(params);

      const meterOfWaterCard = meters.find(
        meter => meter.meterNo === waterCard.meterNo,
      );

      dispatch(removeWaterCardRedux(waterCard));

      dispatch(removeMeterRedux(meterOfWaterCard!));
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Kartınız başarıyla kullanıma kapatıldı.',
        type: 'success',
      });

      return result;
    } catch (err: any) {
      console.error(err);

      showMessage({
        text1: 'İşlem Başarısız',
        text2: err?.message || 'Bilinmeyen bir hata oluştu',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    removeWaterCardAsync,
    isLoading: loading,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
  };
};
