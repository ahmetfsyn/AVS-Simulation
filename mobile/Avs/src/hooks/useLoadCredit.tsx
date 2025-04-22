import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {RootState} from '../redux/store';
import {NdefError} from '../errors/NdefError';
import {ndefErrorMessages} from '../errorMessages/NdefErrorMessages';
export const MIN_CREDIT = 36;
export const MAX_CREDIT = 10000;

export const useLoadCredit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const {writeNfc, writeNdefError, writeNdefLoading} = useWriteToNdef();
  const mutation = useMutation({
    mutationFn: (params: UpdatePartiallyWaterCardParams) =>
      updatePartiallyWaterCard(params),
    onError: err => {
      console.error('Mutation error:', err);
      setError(err.message);
    },
  });
  const cityHall = useSelector((state: RootState) => state.app.cityHall);

  const loadCreditToWaterCardAsync = useCallback(
    async (params: {
      amount: number;
      creditCard: ICreditCard;
      waterCard: IWaterCard;
    }) => {
      const {amount, creditCard, waterCard} = params;
      try {
        const totalCredit =
          waterCard.credit +
          Math.floor(amount / (cityHall?.minCredit || MIN_CREDIT));
        const updatedWaterCard: UpdatedWaterCard[] = [
          {op: 'replace', path: '/credit', value: totalCredit},
        ];
        const nfcResult = await writeNfc({
          meterNo: waterCard.meterNo,
          credit: totalCredit,
        });
        if (!nfcResult) {
          throw new NdefError(ndefErrorMessages.CantWriteNdef);
        }
        setLoading(true);
        // console.log(updatedWaterCard, waterCard);
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
        setIsSuccess(true);
      } catch (err: any) {
        console.error('loadCreditToWaterCardAsync error:', err);
        setError(err.message || 'Bilinmeyen bir hata oluştu.');
      } finally {
        setLoading(false);
        await NfcManager.cancelTechnologyRequest();
      }
    },
    [dispatch, writeNfc, mutation, cityHall],
  );

  return {
    loadCreditToWaterCardAsync,
    isLoading: loading || writeNdefLoading,
    isSuccess,
    error,
    reset: () => setError(null),
  };
};
