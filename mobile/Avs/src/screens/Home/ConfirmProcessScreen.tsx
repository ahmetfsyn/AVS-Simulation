import {View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {CustomButton} from '../../imports/LoginScreenImports';
import {Text} from 'react-native-paper';

const ConfirmProcessScreen: React.FC = () => {
  const route = useRoute();
  const routeParams: any = route.params;

  console.log(routeParams);
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Yapmak istediğiniz işlem tutarı: {routeParams.amount} TL</Text>
      <Text>İşleminizi onaylıyor musunuz ?</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          display: 'flex',
          width: '100%',
        }}>
        <CustomButton mode="contained-tonal">İptal</CustomButton>
        <CustomButton mode="contained">Onayla</CustomButton>
      </View>
    </View>
  );
};

export default ConfirmProcessScreen;
