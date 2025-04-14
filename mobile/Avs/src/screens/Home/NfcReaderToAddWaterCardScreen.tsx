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
  useAddWaterCard,
  useEffect,
  useNavigation,
  useReadNdef,
} from '../../imports/NfcReaderToAddWaterCardScreenImports';
const NfcReaderToAddWaterCardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {isLoading, data, error} = useReadNdef();
  const {addWaterCardAsync} = useAddWaterCard();

  useEffect(() => {
    if (data) {
      addWaterCardAsync(data);
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
                text="Su abone kartınızı eklemek için telefonun arkasına yaklaştırınız"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default NfcReaderToAddWaterCardScreen;
