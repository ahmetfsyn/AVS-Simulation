import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {IWaterCard} from '../../models/WaterCard';
import {IMeter} from '../../models/Meter';

const WaterCard: React.FC<{waterCard: IWaterCard; meter: IMeter}> = (props: {
  waterCard: IWaterCard;
  meter: IMeter;
}) => {
  const {meter, waterCard} = props;

  return (
    <Card style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <Card.Cover
          source={require('../../../assets/su-abone-karti.png')}
          resizeMode="cover"
        />

        <View
          style={{
            display: 'flex',
            position: 'absolute',
            padding: 10,
          }}>
          <Text variant="titleSmall">{waterCard?.subscriberNo}</Text>
          <Text variant="titleSmall">{meter?.waterCompanyName}</Text>
          <Text variant="titleSmall">{meter?.meterNo}</Text>
        </View>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

export default WaterCard;
