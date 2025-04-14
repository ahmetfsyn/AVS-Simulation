import {useState} from 'react';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export const useWriteToNfc = () => {
  const [result, setResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const writeNfc = async (data: any) => {
    try {
      await NfcManager.cancelTechnologyRequest();
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const jsonString = JSON.stringify(data);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(jsonString)]);
      if (bytes) {
        console.log('bytes', bytes);
        setLoading(true);
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        setResult(true);
      }
    } catch (nfcWriteError: any) {
      console.error(nfcWriteError.message);
      throw nfcWriteError;
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  const resetResult = () => {
    setResult(false);
  };

  return {writeNfc, result, isLoading: loading, resetResult};
};
