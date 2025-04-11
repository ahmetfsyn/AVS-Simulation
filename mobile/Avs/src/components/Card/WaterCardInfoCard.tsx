import {View} from 'react-native';
import React from 'react';
import {Card, Text, useTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IWaterCard} from '../../models/WaterCard';

export type WaterCardInfoCardProps = {
  waterCard: IWaterCard;
};

const WaterCardInfoCard = (props: WaterCardInfoCardProps) => {
  const theme = useTheme();
  const {waterCard} = props;
  return (
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
          <Ionicons name="wallet" size={24} color={theme.colors.onBackground} />
          <Text variant="labelLarge">Bakiye:</Text>
          <Text variant="bodyLarge">{waterCard?.credit} TL</Text>
        </View>

        {/* <View
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
        </View> */}

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
          <Text variant="bodyLarge">{waterCard?.meterNo}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="book-account"
            size={24}
            color={theme.colors.onBackground}
          />
          <Text variant="labelLarge">Adres:</Text>
          <Text variant="bodyLarge">
            {waterCard?.address || 'Rastgele adres'}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WaterCardInfoCard;
