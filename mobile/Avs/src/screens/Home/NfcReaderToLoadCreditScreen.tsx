/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  Dialog,
  Portal,
  Text,
  useTheme,
} from 'react-native-paper';
import {BackHandler, StyleSheet, View} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {useReadNdef} from '../../hooks/useReadNdef';
import NfcManager from 'react-native-nfc-manager';
import {showMessage} from '../../utils/showMessage';
import PageInfoCard from '../../components/Card/PageInfoCard';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/Button/CustomButton';

const NfcReaderToLoadCreditScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [confirmDialog, setConfirmDialog] = useState(false);
  const {amount, waterCard}: any = route.params;
  const theme = useTheme();
  const {isLoading, data, error, reset, readNdef, timeoutFlag} = useReadNdef();

  useFocusEffect(
    useCallback(() => {
      navigation?.getParent()?.setOptions({
        gestureEnabled: false,
        tabBarStyle: {display: 'none'},
      });
      readNdef();

      const blockBack = () => true;
      BackHandler.addEventListener('hardwareBackPress', blockBack);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', blockBack);
        NfcManager.cancelTechnologyRequest();
        navigation?.getParent()?.setOptions({
          gestureEnabled: true,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderColor: 'transparent',
          },
        });
      };
    }, []),
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!timeoutFlag && !data) {
        showMessage({
          text1: 'İşlem Başarısız',
          text2: 'Kart okuma zaman aşımına uğradı.',
          type: 'error',
        });
        setTimeout(() => {
          navigation.replace('Home');
        }, 1000);
      }
    }, 10 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [data, timeoutFlag]);

  useEffect(() => {
    if (data) {
      console.log(data);
      if (data.cardType === 'CREDIT_CARD') {
        setConfirmDialog(true);
      } else {
        showMessage({
          text1: 'İşlem Başarısız',
          text2: 'Lütfen kredi veya banka kartınızı okutunuz.',
          type: 'error',
        });
        navigation.replace('Home');
      }
    }
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          {isLoading ? (
            <ActivityIndicator color="white" size={32} />
          ) : (
            <>
              <PageInfoCard
                style={styles.pageInfoCard}
                variant="titleLarge"
                text="Lütfen bakiye yüklemek için kredi veya banka kartınızı okutunuz."
              />
              <View style={styles.animationContainer}>
                <LottieView
                  source={require('../../../assets/TarsusBelediyesi/scan-nfc-to-pay.json')}
                  autoPlay
                  style={styles.lottieAnimation}
                />
              </View>

              <View>
                <CustomButton
                  mode="contained"
                  onPress={() => {
                    setConfirmDialog(false);
                    navigation.replace('Home');
                  }}>
                  İptal Et
                </CustomButton>
              </View>

              <Portal>
                <Dialog
                  visible={confirmDialog}
                  onDismiss={() => setConfirmDialog(false)}
                  dismissable={false}>
                  <Dialog.Title>Bilgilendirme</Dialog.Title>
                  <Dialog.Content>
                    <Text variant="bodyMedium">
                      Yüklemek istediğiniz tutar: {amount}
                    </Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <View style={styles.dialogActionsContainer}>
                      <CustomButton
                        mode="text"
                        onPress={() => {
                          setConfirmDialog(false);
                          navigation.replace('Home');
                        }}>
                        İptal
                      </CustomButton>
                      <CustomButton
                        mode="contained"
                        onPress={() => {
                          setConfirmDialog(false);
                          navigation.replace(
                            'NfcReaderToWriteCreditToWaterCard',
                            {
                              amount,
                              waterCard,
                              creditCard: data,
                            },
                          );
                        }}>
                        İleri
                      </CustomButton>
                    </View>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    flex: 1,
    padding: 16,
    gap: 10,
    justifyContent: 'center',
  },
  pageInfoCard: {
    textAlign: 'center',
  },
  animationContainer: {
    flex: 1,
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
  dialogActionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
});

export default NfcReaderToLoadCreditScreen;
