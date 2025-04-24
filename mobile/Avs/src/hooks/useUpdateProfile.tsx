import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {showMessage} from '../utils/showMessage';
import {updateUser} from '../services/userService';
import {useDispatch} from 'react-redux';
import {updateUserRedux} from '../redux/slices/userSlice';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: updateUser,
  });

  const updateUserAsync = async ({userId, data}: any) => {
    setLoading(true);
    console.log(userId, data);
    try {
      const updatedUser = [
        {
          op: 'replace',
          path: '/email',
          value: data.email,
        },
        {
          op: 'replace',
          path: '/phoneNumber',
          value: data.phoneNumber,
        },
      ];

      await mutation.mutateAsync({userId, updatedUser});

      if (mutation.isSuccess) {
        dispatch(
          updateUserRedux({
            email: data.email,
            phoneNumber: data.phoneNumber,
          }),
        );
        showMessage({
          text1: 'İşlem Başarılı',
          text2: 'Profiliniz başarıyla güncellendi.',
          type: 'success',
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({
        text1: 'İşlem Başarısız',
        text2: 'Profiliniz güncellenirken bir hata oluştu.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return {useUpdateProfileLoading: loading, updateUserAsync};
};
