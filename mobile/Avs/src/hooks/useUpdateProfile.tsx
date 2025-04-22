import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FormikHelpers} from 'formik';
import {useMutation} from '@tanstack/react-query';
import {showMessage} from '../utils/showMessage';
import {updateUser} from '../services/userService';

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Başarıyla kayıt oldunuz.',
        type: 'success',
      });
    },
  });

  return {loading};
};
