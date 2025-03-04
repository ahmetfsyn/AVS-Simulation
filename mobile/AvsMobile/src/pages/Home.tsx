import {StyleSheet, View, Text, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export default function App() {
  const [nfcData, setNfcData] = useState('');

  useEffect(() => {
    NfcManager.start();
  }, []);

  const readNfcTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();

      if (!tag || !tag.ndefMessage) {
        Alert.alert('Hata', 'Kart okunamadı, tekrar deneyin.');
        return;
      }

      const ndefRecord = tag.ndefMessage[0];
      //   console.warn(ndefRecord);

      const payload = Ndef.text.decodePayload(ndefRecord.payload);
      console.warn(payload);

      //   console.log('NFC Verisi:', payload);

      setNfcData(payload); // Veriyi state içine kaydet
      Alert.alert('Okunan NFC', payload);
    } catch (err) {
      console.warn('NFC okuma hatası:', err);
    } finally {
      await NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={readNfcTag}>
        Kart Okut
      </Button>
      <Text style={styles.text}>Okunan Veri: {nfcData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8705',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
});
