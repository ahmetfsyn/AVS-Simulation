import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import {showMessage} from '../../utils/showMessage';
import {useNavigation} from '@react-navigation/native';
import NfcManager from 'react-native-nfc-manager';
import {ISuccessState} from '../../models/ISuccessState';

const PayForKioskScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<ISuccessState>({
    result: null,
    error: null,
  });

  useEffect(() => {
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
        text2: 'Ödeme işlemi başarıyla gerçekleşti.',
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
    abstractCard: {
      backgroundColor: theme.colors.cardBackground,
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
          <Card style={{backgroundColor: theme.colors.cardBackground}}>
            <Card.Content>
              <Text variant="titleLarge" style={{textAlign: 'center'}}>
                Lütfen ödeme yapmak için temassız destekli kredi veya banka
                kartınızı okutunuz.
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

export default PayForKioskScreen;
