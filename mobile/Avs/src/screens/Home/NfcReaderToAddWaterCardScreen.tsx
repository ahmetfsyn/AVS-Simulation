/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-hooks/exhaustive-deps */

import {useCallback, useEffect} from 'react';
import {showMessage} from '../../utils/showMessage';
import NfcManager from 'react-native-nfc-manager';
import {BackHandler, StyleSheet, View} from 'react-native';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import PageInfoCard from '../../components/Card/PageInfoCard';
import LottieView from 'lottie-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useReadNdef} from '../../hooks/useReadNdef';
import {useAddWaterCard} from '../../hooks/useAddWaterCard';
import CustomButton from '../../components/Button/CustomButton';

const NfcReaderToAddWaterCardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {isLoading, data, error, readNdef, timeoutFlag} = useReadNdef();
  const {addWaterCardAsync, addWaterCardLoading} = useAddWaterCard();
  const theme = useTheme();

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
      addWaterCardAsync(data);
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
        {isLoading || addWaterCardLoading ? (
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

            <View>
              <CustomButton
                mode="contained"
                onPress={() => {
                  navigation.replace('Home');
                }}>
                İptal Et
              </CustomButton>
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
