/* eslint-disable react-hooks/exhaustive-deps */
import NfcManager, {Ndef, NfcTech, TagEvent} from 'react-native-nfc-manager';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {showMessage} from '../utils/showMessage';
import {useAddWaterCard} from './useAddWaterCard';

export const useReadNdef = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  const isCancelled = useRef(false);
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
    checkNfc();

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const tag: TagEvent | null = await NfcManager.getTag();
      if (isCancelled.current) {
        return;
      }

      if (tag) {
        const json = decodeNdef(tag);

        if (json) {
          setData(json);
          navigation.canGoBack() && navigation.goBack();
        } else {
          setError('Geçersiz ya da okunamayan kart.');
        }
      }
    } catch (e) {
      if (!isCancelled.current) {
        setError('Kart okunurken bir hata oluştu.');
      }
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  useEffect(() => {
    readNdef();

    const timeoutId = setTimeout(() => {
      isCancelled.current = true;
      setError('Kart okuma zaman aşımına uğradı.');
      NfcManager.cancelTechnologyRequest();
    }, 10 * 1000);

    return () => {
      clearTimeout(timeoutId);
      NfcManager.cancelTechnologyRequest();
      isCancelled.current = true;
    };
  }, []);

  useEffect(() => {
    if (error) {
      showMessage({
        text1: 'İşlem Başarısız',
        text2: error,
        type: 'error',
      });
      navigation.canGoBack() && navigation.goBack();
    }
  }, [error]);

  return {isLoading: loading, data, error};
};
