/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {BackHandler, StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useLoadCredit} from '../../hooks/useLoadCredit';
import NfcManager from 'react-native-nfc-manager';
import {useCallback, useEffect} from 'react';
import {showMessage} from '../../utils/showMessage';
import LottieView from 'lottie-react-native';
import CustomButton from '../../components/Button/CustomButton';
import PageInfoCard from '../../components/Card/PageInfoCard';

const NfcReaderToWriteCreditToWaterCardScreen: React.FC = () => {
  const route = useRoute();
  const routeParams: any = route.params;
  const navigation = useNavigation<any>();
  const {isLoading, loadCreditToWaterCardAsync, error, reset, isSuccess} =
    useLoadCredit();
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      const blockBack = () => true;
      BackHandler.addEventListener('hardwareBackPress', blockBack);
      console.log(navigation.getParent());
      navigation?.getParent()?.setOptions({
        gestureEnabled: false,
        tabBarStyle: {display: 'none'},
      });

      loadCreditToWaterCardAsync(routeParams);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', blockBack);
        NfcManager.cancelTechnologyRequest();
        navigation.getParent()?.setOptions({
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
    if (isSuccess) {
      showMessage({
        text1: 'İşlem Başarılı',
        text2: 'Bakiyeniz başarıyla yüklendi',
        type: 'success',
      });

      navigation.replace('Home');
    }
  }, [isSuccess]);

  // useEffect(() => {
  //   if (error) {
  //     showMessage({
  //       text1: 'İşlem Başarısız',
  //       text2: error,
  //       type: 'error',
  //     });
  //     reset();
  //     navigation.replace('Home');
  //     return;
  //   }
  // }, [error]);

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
                text="Lütfen bakiyeyi su kartınıza yüklemek için kartınızı okutunuz."
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
                    // setConfirmDialog(false);
                    navigation.replace('Home');
                  }}>
                  İptal Et
                </CustomButton>
              </View>
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

export default NfcReaderToWriteCreditToWaterCardScreen;
