import {useDispatch, useSelector} from 'react-redux';
import {IWaterCard} from '../models/WaterCard';
import {RootState} from '../redux/store';
import {addWaterCardRedux} from '../redux/slices/waterCardSlice';
import {useMutation} from '@tanstack/react-query';
import {addWaterCard} from '../services/waterCardService';
import {AddWaterCardParams} from '../models/types/AddWaterCardParams';
import {useState} from 'react';
import {showMessage} from '../utils/showMessage';
import {useNavigation} from '@react-navigation/native';

export const useAddWaterCard = () => {
  const {user} = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const mutation = useMutation({
    mutationFn: (params: AddWaterCardParams) => addWaterCard(params),
    onSuccess: newWaterCard => {
      dispatch(addWaterCardRedux(newWaterCard));
    },
  });

  const addWaterCardAsync = async (waterCardJson: any) => {
    setLoading(true);
    try {
      const waterCard: IWaterCard = {
        credit: waterCardJson.credit,
        meterNo: waterCardJson.meterNo,
        subscriberNo: user?.subscriberNo,
      };

      const newWaterCard = await mutation.mutateAsync({
        user: user!,
        waterCard,
      });

      // console.log('newWaterCard = ', newWaterCard);
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Kartınız başarıyla eklendi.',
        type: 'success',
      });
      navigation.replace('Home');
    } catch (error) {
      showMessage({
        text1: 'İşlem Başarısız',
        text2: 'Kartınız eklenemedi.',
        type: 'error',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {addWaterCardAsync, addWaterCardLoading: loading};
};
