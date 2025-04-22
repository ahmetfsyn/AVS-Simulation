/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, StyleSheet, View} from 'react-native';
import {RootState} from '../../redux/store';
import AddCard from '../../components/Card/AddCard';
import WaterCard from '../../components/Card/WaterCard';
import {useDeleteWaterCard} from '../../hooks/useDeleteWaterCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ActivityIndicator, IconButton, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {IWaterCard} from '../../models/WaterCard';

const MyCardsScreen: React.FC = () => {
  const waterCards = useSelector(
    (state: RootState) => state?.waterCard?.waterCards,
  );
  const meters = useSelector((state: RootState) => state?.meter?.meters);
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const {removeWaterCardAsync, isLoading} = useDeleteWaterCard();
  const handleRemoveWaterCard = async (waterCard: IWaterCard) => {
    await removeWaterCardAsync({
      waterCard,
    });
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
      {waterCards?.map((waterCard, index) => (
        <View
          key={index}
          style={{
            display: 'flex',
            position: 'relative',
          }}>
          <WaterCard waterCard={waterCard} meter={meters[index]} />
          <View
            style={{
              position: 'absolute',
              bottom: 5,
              right: 5,
              backgroundColor: theme.colors.error,
              borderRadius: 50,
            }}>
            <IconButton
              disabled={isLoading}
              onPress={() => handleRemoveWaterCard(waterCard)}
              icon={() => {
                return isLoading ? (
                  <ActivityIndicator size={32} color="white" />
                ) : (
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={24}
                    color={theme.colors.onBackground}
                  />
                );
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MyCardsScreen;
