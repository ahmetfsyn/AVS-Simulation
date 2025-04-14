/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  LottieView,
  NfcManager,
  PageInfoCard,
  React,
  StyleSheet,
  View,
  showMessage,
  useEffect,
  useLoadCredit,
  useNavigation,
  useReadNdef,
  useRoute,
} from '../../imports/NfcReaderToLoadCreditScreen';
const NfcReaderToLoadCreditScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {isLoading, data} = useReadNdef();
  const {amount, waterCard}: any = useRoute().params;
  const {loadCreditToWaterCardAsync} = useLoadCredit();

  useEffect(() => {
    if (data) {
      loadCreditToWaterCardAsync({amount, creditCard: data, waterCard});
    }
  }, [data]);

  useEffect(() => {
    const parentNavigation = navigation.getParent();

    if (parentNavigation) {
      const state = parentNavigation.getState();

      if (state.type === 'tab') {
        const unsubscribe = parentNavigation?.addListener(
          'tabPress',
          async () => {
            // Sayfa değişirken NFC işlemini iptal et
            await NfcManager.cancelTechnologyRequest();
            showMessage({
              text1: 'İşlem Başarısız',
              text2: 'İşlem iptal edildi.',
              type: 'error',
            });
          },
        );

        return () => unsubscribe();
      }
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          padding: 16,
          gap: 10,
          justifyContent: 'center',
        }}>
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
                text="Lütfen bakiye yüklemek için kredi veya banka kartınızı okutunuz."
              />
            </View>

            <View style={{flex: 1}}>
              <LottieView
                source={require('../../../assets/TarsusBelediyesi/scan-nfc-to-pay.json')}
                autoPlay
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default NfcReaderToLoadCreditScreen;
