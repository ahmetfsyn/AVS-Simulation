import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {showMessage} from '../../utils/showMessage';
import {useNavigation, useRoute} from '@react-navigation/native';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useDispatch, useSelector} from 'react-redux';
import {addWaterCard} from '../../redux/slices/appSlice';
import {RootState} from '../../redux/store';
import {IWaterCard} from '../../models/WaterCard';

interface IsSuccessState {
  result: boolean | null;
  error: string | null;
}

const NfcReaderToAddWaterCardScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<IsSuccessState>({
    result: null,
    error: null,
  });
  const userInfo = useSelector((state: RootState) => state.app.user);
  const userWaterCards = useSelector(
    (state: RootState) => state.app.waterCards,
  );

  const dispatch = useDispatch();

  async function readNdef() {
    setLoading(true);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      // dispatch(
      //   addWaterCard({
      //     balance: 100,
      //     cardCompany: 'Metlab',
      //     debt: 10,
      //     id: 2,
      //     name: 'Ahmet Furkan Sayan',
      //     subscriberNo: '1231231',
      //   }),
      // );

      if (tag) {
        const ndefMessage = tag.ndefMessage;

        if (ndefMessage && ndefMessage.length > 0) {
          const decodedText = ndefMessage
            .map(record => Ndef.text.decodePayload(record.payload))
            .join('');

          const waterCard: IWaterCard = JSON.parse(decodedText);
          console.log(waterCard);

          dispatch(addWaterCard(waterCard));
          setIsSuccess({result: true, error: null});
        } else {
          return {result: false, error: 'Etiket boş.'};
        }
      } else {
        return {result: false, error: 'Kart bilgisi okunamadı.'};
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    const parentNavigation = navigation.getParent();

    if (parentNavigation) {
      const state = parentNavigation.getState();

      if (state.type === 'tab') {
        const unsubscribe = parentNavigation?.addListener(
          'tabPress',
          async () => {
            // Sayfa değişirken NFC işlemini iptal et
            NfcManager.cancelTechnologyRequest();
            setIsSuccess({
              error: 'İşlem iptal edildi.',
              result: false,
            });
          },
        );

        return () => unsubscribe();
      }
    }
  }, [navigation]);

  useEffect(() => {
    readNdef();

    const timeout = setTimeout(() => {
      setIsSuccess({
        error: 'Kart okuma zaman aşımına uğradı',
        result: false,
      });
    }, 10000);

    return () => {
      NfcManager.cancelTechnologyRequest();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isSuccess.result === true) {
      showMessage({
        type: 'success',
        text1: 'Başarılı',
        text2: 'Kart ekleme işlemi başarıyla gerçekleşti.',
      });
      navigation.canGoBack() ? navigation.goBack() : null;
    } else if (isSuccess.result === false) {
      showMessage({
        type: 'error',
        text1: 'Başarısız',
        text2: isSuccess.error,
      });
      navigation.canGoBack() ? navigation.goBack() : null;
    }
  }, [isSuccess.result]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          padding: 16,
          gap: 10,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}>
          <Card>
            <Card.Content>
              <Text variant="titleLarge" style={{textAlign: 'center'}}>
                Lütfen kart eklemek için su abone kartınızı okutunuz.
              </Text>
            </Card.Content>
          </Card>
        </View>

        <View style={{flex: 1}}>
          <LottieView
            source={require('../../../assets/scan-nfc-to-pay.json')}
            autoPlay
            loop
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default NfcReaderToAddWaterCardScreen;
