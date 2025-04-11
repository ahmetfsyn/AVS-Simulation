import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import WaterCard from '../../components/Card/WaterCard';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {IWaterCard} from '../../models/WaterCard';
import WaterCardInfoCard from '../../components/Card/WaterCardInfoCard';
import {ScrollView} from 'react-native-gesture-handler';
import {showMessage} from '../../utils/showMessage';
import {MIN_CREDIT} from '../../hooks/useLoadCredit';

const LoadCreditInfoScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {waterCardIndex}: any = route.params;
  const [amount, setAmount] = useState<number>(0);
  const waterCard = useSelector(
    (state: RootState): IWaterCard =>
      state.waterCard.waterCards[waterCardIndex || 0],
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <WaterCard data={waterCard} />
      <WaterCardInfoCard waterCard={waterCard} />
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
            onChangeText={value => setAmount(Number(value))}
            value={amount === 0 && ''}
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
