import {useSelector} from 'react-redux';
import {
  Card,
  Text,
  CustomButton,
  CustomTextInput,
  MIN_CREDIT,
  React,
  ScrollView,
  StyleSheet,
  WaterCard,
  WaterCardInfoCard,
  showMessage,
  useNavigation,
  useRoute,
  useState,
} from '../../imports/LoadCreditInfoScreenImports';
import {RootState} from '../../redux/store';

const LoadCreditInfoScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {waterCardIndex, meterIndex}: any = route.params;
  const [amount, setAmount] = useState<number>(0);

  const waterCard = useSelector(
    (state: RootState) => state.waterCard.waterCards[waterCardIndex],
  );
  const meter = useSelector(
    (state: RootState) => state.meter.meters[meterIndex],
  );

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
              if (amount < MIN_CREDIT) {
                showMessage({
                  text1: 'İşlem Başarısız',
                  text2: 'Lütfen minimum 35 TL giriniz.',
                  type: 'error',
                });
              } else {
                navigation.navigate('NfcReaderToLoadCredit', {
                  amount,
                  waterCard,
                });
                setAmount(0);
              }
            }}>
            Onayla
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
