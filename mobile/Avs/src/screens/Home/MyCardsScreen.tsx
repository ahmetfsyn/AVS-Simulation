import {
  ActivityIndicator,
  AddCard,
  IconButton,
  MaterialCommunityIcons,
  View,
  React,
  ScrollView,
  StyleSheet,
  WaterCard,
  useDeleteWaterCard,
  useNavigation,
  useSelector,
  useTheme,
} from '../../imports/MyCardScreenImports';
import {RootState} from '../../redux/store';
const MyCardsScreen: React.FC = () => {
  const waterCards = useSelector(
    (state: RootState) => state?.waterCard?.waterCards,
  );
  const meters = useSelector((state: RootState) => state?.meter?.meters);
  const navigation = useNavigation<any>();
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
              onPress={() => removeWaterCardAsync({waterCard})}
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
