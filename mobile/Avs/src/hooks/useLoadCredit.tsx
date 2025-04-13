import {useDispatch, useSelector} from 'react-redux';
import {updateWaterCardRedux} from '../redux/slices/waterCardSlice';
import {useMutation} from '@tanstack/react-query';
import {
  UpdatedWaterCard,
  updatePartiallyWaterCard,
  UpdatePartiallyWaterCardParams,
} from '../services/waterCardService';
import {useEffect, useState} from 'react';
import {showMessage} from '../utils/showMessage';
import {IWaterCard} from '../models/WaterCard';
import {ICreditCard} from '../models/CreditCard';

export const MIN_CREDIT = 36; // 1 ton suya karşılık ödenmesi gereken tutar.
export const MAX_CREDIT = 1000;

export const useLoadCredit = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (params: UpdatePartiallyWaterCardParams) =>
      updatePartiallyWaterCard(params),
    onSuccess: () => {
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Bakiyeniz başarıyla yüklendi.',
        type: 'success',
      });
    },
    onError: mutationError => {
      console.error(mutationError);
      setError(mutationError.message);
    },
  });

  const checkParams = (params: any) => {
    const {amount, waterCard, creditCard} = params;

    if (amount < MIN_CREDIT || amount > MAX_CREDIT) {
      setError(
        `En az ${MIN_CREDIT} TL en fazla ${MAX_CREDIT} TL yüklenebilir.`,
      );
      return false;
    } else if (creditCard.balance < amount) {
      setError('Bakiyeniz yetersiz');
      return false;
    }
    return true;
  };

  const loadCreditToWaterCardAsync = async (params: {
    amount: number;
    creditCard: ICreditCard;
    waterCard: IWaterCard;
  }) => {
    setLoading(true);

    try {
      if (!checkParams(params)) {
        throw new Error(error || 'Bilinmeyen bir hata oluştu.');
      }
      const {amount, waterCard, creditCard} = params;

      const updatedWaterCard: UpdatedWaterCard[] = [
        {
          op: 'replace',
          path: '/credit',
          value: waterCard.credit + amount,
        },
      ];

      await mutation.mutateAsync({
        updatedWaterCard,
        waterCard,
      });
      dispatch(
        updateWaterCardRedux({
          amount,
          waterCard,
        }),
      );
    } catch (updateWaterCardAsyncError: any) {
      setError(updateWaterCardAsyncError.messge);
      console.error(updateWaterCardAsyncError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error,
        type: 'error',
      });
    }
  }, [error]);

  return {loadCreditToWaterCardAsync, isLoading: loading, error};
};
