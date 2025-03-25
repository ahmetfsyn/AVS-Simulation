import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Card, Text} from 'react-native-paper';
import {IWaterCardInfo} from '../../models/abstracts/IWaterCardInfo';

type WaterCardProps = {
  data: IWaterCardInfo;
};

const WaterCard: React.FC<{data: IWaterCardInfo}> = (props: WaterCardProps) => {
  const {data} = props;

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      borderRadius: 10,
    },
  });

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
          <Text variant="titleSmall">{data.subscriberNo}</Text>
          <Text variant="titleSmall">{data.cardCompany}</Text>
          <Text variant="titleSmall">{data.name}</Text>
        </View>
      </View>
    </Card>
  );
};

export default WaterCard;
