/* eslint-disable react/react-in-jsx-scope */
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useGetCityHall} from '../../hooks/useGetCityHall';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Card, Text} from 'react-native-paper';
import WaterCard from '../../components/Card/WaterCard';
import WaterCardInfoCard from '../../components/Card/WaterCardInfoCard';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {MAX_CREDIT, MIN_CREDIT} from '../../hooks/useLoadCredit';
import {showMessage} from '../../utils/showMessage';
import {StyleSheet} from 'react-native';

const LoadCreditInfoScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {waterCard, meter}: any = route.params;
  const [amount, setAmount] = useState<number>(0);

  const cityHall = useSelector((state: RootState) => state.app.cityHall);
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <WaterCard waterCard={waterCard} meter={meter} />
      <WaterCardInfoCard waterCard={waterCard} meter={meter} />
      <Card>
        <Card.Title
          title="Bakiye Yükleme Bilgileri"
          titleVariant="titleMedium"
        />
        <Card.Content
          style={{
            gap: 10,
          }}>
          <Text variant="bodyLarge">
            Lütfen kartınıza yüklemek istediğiniz tutarı giriniz.
          </Text>
          <CustomTextInput
            mode="flat"
            style={{textAlign: 'center'}}
            placeholder="Tutar(₺) giriniz."
            inputMode="decimal"
            keyboardType="numeric"
            label={'Tutar(₺)'}
            onChangeText={value => setAmount(Number(value))}
            value={amount.toString()}
          />
        </Card.Content>
        <Card.Actions>
          <CustomButton
            style={{marginHorizontal: 'auto'}}
            onPress={() => navigation.goBack()}
            mode="text">
            İptal
          </CustomButton>
          <CustomButton
            mode="contained"
            disabled={amount === 0}
            onPress={() => {
              if (
                amount < (cityHall?.minCredit || MIN_CREDIT) ||
                amount > (cityHall?.maxCredit || MAX_CREDIT)
              ) {
                showMessage({
                  text1: 'İşlem Başarısız',
                  text2:
                    'En az ' +
                    cityHall?.minCredit +
                    ' TL en fazla ' +
                    cityHall?.maxCredit +
                    ' TL yüklenebilir.',
                  type: 'error',
                });
              } else {
                navigation.replace('NfcReaderToLoadCredit', {
                  amount,
                  waterCard,
                });
                setAmount(0);
              }
            }}>
            İleri
          </CustomButton>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

export default LoadCreditInfoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 15,
  },
});
