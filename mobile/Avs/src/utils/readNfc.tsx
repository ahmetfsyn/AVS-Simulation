import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {ISuccessState} from '../models/ISuccessState';

type WriteToNfcParams = {
  data: object;
};
export async function readNfc(
  setIsSuccess: React.Dispatch<React.SetStateAction<ISuccessState>>,
) {
  try {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    const tag = await NfcManager.getTag();

    if (tag) {
      setIsSuccess({result: true, error: null});
    } else {
      setIsSuccess({result: false, error: 'Kart bilgisi okunamadı.'});
    }
  } catch (error) {
    console.warn(error);
    return {
      result: false,
      error: 'NFC okuma hatası: ' + (error as Error).message,
    };
  } finally {
    NfcManager.cancelTechnologyRequest();
  }
}

async function writeToNfc(params: WriteToNfcParams) {}
