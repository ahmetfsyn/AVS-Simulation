import Toast, {ToastShowParams} from 'react-native-toast-message';

export const showMessage = (params: ToastShowParams) => {
  return Toast.show({
    ...params,
    position: 'top',
    props: {useNativeDriver: true},
  });
};
