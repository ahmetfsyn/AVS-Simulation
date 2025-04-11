import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import WaterCard from '../../components/Card/WaterCard';
import {ActivityIndicator, IconButton, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCard from '../../components/Card/AddCard';
import {useNavigation} from '@react-navigation/native';
import {useDeleteWaterCard} from '../../hooks/useDeleteWaterCard';

const MyCardsScreen: React.FC = () => {
  const waterCards = useSelector(
    (state: RootState) => state?.waterCard?.waterCards,
  );
  const {accessToken} = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();
  const theme = useTheme();
  const {removeWaterCardAsync, isLoading} = useDeleteWaterCard();

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
          <WaterCard data={waterCard} />
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
              onPress={() =>
                removeWaterCardAsync({waterCard, accessToken: accessToken!})
              }
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
