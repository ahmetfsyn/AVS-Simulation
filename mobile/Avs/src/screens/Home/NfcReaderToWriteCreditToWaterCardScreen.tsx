/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {
  LottieView,
  PageInfoCard,
  showMessage,
  useEffect,
  useNavigation,
} from '../../imports/NfcReaderToAddWaterCardScreenImports';
import {useRoute} from '@react-navigation/native';
import {useWriteToNfc} from '../../hooks/useWriteToNfc';
import {useDispatch} from 'react-redux';
import {updateWaterCardRedux} from '../../redux/slices/waterCardSlice';

const NfcReaderToWriteCreditToWaterCardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const routeParams: any = route.params;
  const {isLoading, result, writeNfc, resetResult} = useWriteToNfc();
  const dispatch = useDispatch();

  useEffect(() => {
    if (routeParams) {
      writeNfc({
        credit: routeParams.waterCard.credit + routeParams.amount,
        meterNo: routeParams.waterCard.meterNo,
      });
    }
  }, [routeParams]);

  useEffect(() => {
    if (result) {
      dispatch(
        updateWaterCardRedux({
          amount: routeParams.amount,
          waterCard: routeParams.waterCard,
        }),
      );
      setTimeout(() => {
        showMessage({
          text1: 'İşlem Başarılı',
          text2: 'Bakiyeniz başarıyla yüklendi',
          type: 'success',
        });
        resetResult();
      }, 1000);
      navigation.navigate('Home');
    }
  }, [result]);

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
              loop={!result}
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
