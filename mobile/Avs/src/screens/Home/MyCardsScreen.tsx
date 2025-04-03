import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import WaterCard from '../../components/Card/WaterCard';
import {IconButton, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCard from '../../components/Card/AddCard';
import {useNavigation} from '@react-navigation/native';
import {removeWaterCard} from '../../redux/slices/waterCardSlice';
import {IWaterCardInfo} from '../../models/WaterCardInfo';

const MyCardsScreen: React.FC = () => {
  const waterCards: IWaterCardInfo[] = useSelector(
    (state: RootState) => state.app.waterCards,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
  });

  const deleteWaterCard = (waterCard: IWaterCardInfo): void => {
    dispatch(removeWaterCard(waterCard));
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        gap: 20,
        paddingBottom: 32,
      }}>
      <AddCard navigation={navigation} path="NfcReaderToAddWaterCard" />
      {waterCards.map((waterCard, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            position: 'relative',
          }}>
          <WaterCard data={waterCard} />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: theme.colors.error,
              borderRadius: 10,
            }}>
            <IconButton
              onPress={() => deleteWaterCard(waterCard)}
              icon={() => (
                <MaterialCommunityIcons
                  name="trash-can"
                  size={24}
                  color={theme.colors.onBackground}
                />
              )}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default MyCardsScreen;
