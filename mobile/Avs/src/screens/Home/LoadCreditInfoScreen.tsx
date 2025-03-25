import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import WaterCard from '../../components/Card/WaterCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoadCreditInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const {waterCard} = route.params || {};
  return (
    <View style={styles.container}>
      <WaterCard data={waterCard} />
      <Card>
        <Card.Title title="Kart Bilgileri" titleVariant="titleMedium" />
        <Card.Content
          style={{
            gap: 15,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <Ionicons
              name="wallet"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="labelLarge">Bakiye:</Text>
            <Text variant="bodyLarge">{waterCard?.balance} TL</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="cash-minus"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="labelLarge">Borç:</Text>
            <Text variant="bodyLarge">{waterCard?.debt} TL</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="cog-counterclockwise"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="labelLarge">Sayaç No:</Text>
            <Text variant="bodyLarge">{waterCard?.counter}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="cog-counterclockwise"
              size={24}
              color={theme.colors.onBackground}
            />
            <Text variant="labelLarge">Adres:</Text>
            <Text variant="bodyLarge">{waterCard?.counter}</Text>
          </View>
        </Card.Content>
      </Card>
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
          />
        </Card.Content>
        <Card.Actions>
          <CustomButton
            style={{marginHorizontal: 'auto'}}
            onPress={() => navigation.goBack()}
            mode="text">
            İptal
          </CustomButton>
          <CustomButton mode="contained" onPress={() => console.log('basildi')}>
            Onayla
          </CustomButton>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default LoadCreditInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 15,
  },
});
