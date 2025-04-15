import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import NfcManager from 'react-native-nfc-manager';
import {updateWaterCardRedux} from '../redux/slices/waterCardSlice';
import {
  updatePartiallyWaterCard,
  UpdatePartiallyWaterCardParams,
  UpdatedWaterCard,
} from '../services/waterCardService';
import {ICreditCard} from '../models/CreditCard';
import {IWaterCard} from '../models/WaterCard';
import {showMessage} from '../utils/showMessage';
import {useWriteToNdef} from './useWriteToNdef';

export const MIN_CREDIT = 36;
export const MAX_CREDIT = 1000;

export const useLoadCredit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {writeNfc, writeNdefError, writeNdefLoading} = useWriteToNdef();
  const mutation = useMutation({
    mutationFn: (params: UpdatePartiallyWaterCardParams) =>
      updatePartiallyWaterCard(params),
    onError: err => {
      console.error('Mutation error:', err);
      setError(err.message);
    },
  });
  const checkParams = useCallback((amount: number, creditCard: ICreditCard) => {
    if (amount < MIN_CREDIT || amount > MAX_CREDIT) {
      setError(
        `En az ${MIN_CREDIT} TL, en fazla ${MAX_CREDIT} TL yüklenebilir.`,
      );
      return false;
    }

    if (creditCard.balance < amount) {
      setError('Kredi kartı bakiyesi yetersiz.');
      return false;
    }

    return true;
  }, []);

  const loadCreditToWaterCardAsync = useCallback(
    async (params: {
      amount: number;
      creditCard: ICreditCard;
      waterCard: IWaterCard;
    }) => {
      const {amount, creditCard, waterCard} = params;

      if (!checkParams(amount, creditCard)) {
        return;
      }

      const totalCredit = waterCard.credit + amount;

      try {
        const updatedWaterCard: UpdatedWaterCard[] = [
          {op: 'replace', path: '/credit', value: totalCredit},
        ];

        const nfcResult = await writeNfc({
          meterNo: waterCard.meterNo,
          credit: totalCredit,
        });

        if (!nfcResult) {
          return;
        }
        await mutation.mutateAsync({updatedWaterCard, waterCard});

        dispatch(
          updateWaterCardRedux({
            updatedWaterCard: {
              credit: totalCredit,
              id: waterCard.id,
              meterNo: waterCard.meterNo,
              subscriberNo: waterCard.subscriberNo,
              userId: waterCard.userId,
            },
          }),
        );
        navigation.navigate('Home');

        setTimeout(() => {
          showMessage({
            text1: 'İşlem Başarılı',
            text2: 'Bakiyeniz başarıyla yüklendi',
            type: 'success',
          });
        }, 1000);
      } catch (err: any) {
        console.error('loadCreditToWaterCardAsync error:', err);
        setError(err.message || 'Bilinmeyen bir hata oluştu.');
      } finally {
        setLoading(false);
        await NfcManager.cancelTechnologyRequest();
      }
    },
    [checkParams, dispatch, writeNfc, mutation, navigation],
  );

  return {
    loadCreditToWaterCardAsync,
    isLoading: loading || writeNdefLoading,
    error,
    reset: () => setError(null),
  };
};
