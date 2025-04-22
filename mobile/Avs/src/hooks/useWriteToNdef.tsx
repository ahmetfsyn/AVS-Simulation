import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useState} from 'react';
import {NdefError} from '../errors/NdefError';
import {ndefErrorMessages} from '../errorMessages/NdefErrorMessages';

export const useWriteToNdef = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const writeNfc = async (data: any) => {
    console.log(data);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const jsonString = JSON.stringify(data);
      const bytes = Ndef.encodeMessage([Ndef.textRecord(jsonString)]);
      if (bytes) {
        setLoading(true);
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        return true;
      } else {
        return false;
      }
    } catch (err: any) {
      setError(ndefErrorMessages.CantWriteNdef);
      console.error(err);
      throw new NdefError(error?.toString());
    } finally {
      NfcManager.cancelTechnologyRequest();
      setLoading(false);
    }
  };

  return {writeNfc, writeNdefError: error, writeNdefLoading: loading};
};
