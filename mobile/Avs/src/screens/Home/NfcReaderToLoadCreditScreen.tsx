/* eslint-disable react-hooks/exhaustive-deps */
import {Dialog, Portal, Text} from 'react-native-paper';
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
import {CustomButton, useState} from '../../imports/LoginScreenImports';
const NfcReaderToLoadCreditScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {isLoading, data, error, reset} = useReadNdef();
  const {amount, waterCard}: any = route.params;

  const cancelLoadCredit = async () => {
    await NfcManager.cancelTechnologyRequest();
    setConfirmDialog(false);
    reset();
    showMessage({
      text1: 'İşlem Başarısız',
      text2: 'Bakiye yükleme islemi iptal edildi',
      type: 'error',
    });
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (error) {
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error,
        type: 'error',
      });
      navigation.navigate('Home');
    }
    return () => {
      cancelLoadCredit();
    };
  }, [error]);

  useEffect(() => {
    if (data?.cardType === 'CREDIT_CARD') {
      setConfirmDialog(true);
    }
  }, [data]);

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
      <Portal>
        <Dialog
          visible={confirmDialog}
          onDismiss={cancelLoadCredit}
          dismissable={false}>
          <Dialog.Title>Bilgilendirme</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Yüklemek istediğiniz tutar : {amount}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}>
              <CustomButton mode="text" onPress={cancelLoadCredit}>
                İptal
              </CustomButton>
              <CustomButton
                mode="contained"
                onPress={() => {
                  setConfirmDialog(false);
                  navigation.navigate('NfcReaderToWriteCreditToWaterCard', {
                    amount,
                    waterCard,
                    creditCard: data,
                  });
                }}>
                İleri
              </CustomButton>
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
