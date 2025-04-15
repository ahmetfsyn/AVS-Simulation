/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  LottieView,
  PageInfoCard,
  showMessage,
  useEffect,
} from '../../imports/NfcReaderToAddWaterCardScreenImports';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useLoadCredit} from '../../hooks/useLoadCredit';
import NfcManager from 'react-native-nfc-manager';

const NfcReaderToWriteCreditToWaterCardScreen: React.FC = () => {
  const route = useRoute();
  const routeParams: any = route.params;
  const navigation = useNavigation<any>();
  const {isLoading, loadCreditToWaterCardAsync, error, reset} = useLoadCredit();

  useEffect(() => {
    if (error) {
      navigation.navigate('Home');
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error,
        type: 'error',
      });
      reset();
    }
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, [error]);

  useEffect(() => {
    if (routeParams) {
      loadCreditToWaterCardAsync(routeParams);
    }
  }, [routeParams]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color="white" size={32} />
      ) : (
        <>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
            }}>
            <PageInfoCard
              style={{textAlign: 'center'}}
              variant="titleLarge"
              text="Lütfen bakiyenizi karta yazmak için telefonun arkasındaki NFC modülüne okutunuz."
            />
          </View>

          <View style={{flex: 1}}>
            <LottieView
              source={require('../../../assets/TarsusBelediyesi/scan-nfc-to-pay.json')}
              autoPlay
              loop
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 10,
    justifyContent: 'center',
  },
});

export default NfcReaderToWriteCreditToWaterCardScreen;
