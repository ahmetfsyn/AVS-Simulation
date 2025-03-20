import {View, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import NfcManager, {nfcManager, NfcTech} from 'react-native-nfc-manager';
import CustomButton from '../../components/Button/CustomButton';
NfcManager.start();

const PayForKioskScreen: React.FC = () => {
  const theme = useTheme();

  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    readNdef();
  }, []);

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
      {/* <Text variant="bodyLarge">Lütfen Kartınızı Okutunuz</Text> */}
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

        <View
          style={{
            flex: 1,
            display: 'flex',
          }}>
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
