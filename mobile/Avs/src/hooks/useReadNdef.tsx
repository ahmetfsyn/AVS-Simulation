/* eslint-disable react-hooks/exhaustive-deps */
import NfcManager, {Ndef, NfcTech, TagEvent} from 'react-native-nfc-manager';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export const useReadNdef = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const isCancelled = useRef(false);
  const [data, setData] = useState(null);
  const checkNfc = async () => {
    if (!(await NfcManager.isEnabled())) {
      setError('Lütfen NFC modülünü aktif ediniz.');
      return;
    }
  };

  const decodeNdef = (tag: TagEvent): any | null => {
    try {
      const ndefMessage = tag?.ndefMessage;
      if (!ndefMessage || ndefMessage.length === 0) {
        return null;
      }

      const text = ndefMessage
        .map((record: any) => Ndef.text.decodePayload(record.payload))
        .join('');

      return JSON.parse(text);
    } catch (err) {
      return null;
    }
  };

  const readNdef = async () => {
    try {
      await checkNfc();

      await NfcManager.requestTechnology(NfcTech.Ndef);
      setLoading(true);
      const tag: TagEvent | null = await NfcManager.getTag();

      if (tag) {
        const json = decodeNdef(tag);

        if (json) {
          setData(json);
        } else {
          setError('Geçersiz ya da okunamayan kart.');
        }
      }
    } catch (e) {
      console.error(e);
      setError('Kart okunurken bir hata oluştu.');
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  useEffect(() => {
    readNdef();
    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  return {
    isLoading: loading,
    data,
    error,
    reset: () => {
      setData(null);
      setError(null);
    },
  };
};
