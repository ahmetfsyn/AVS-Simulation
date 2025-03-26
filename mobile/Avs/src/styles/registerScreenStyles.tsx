import {StyleSheet} from 'react-native';
import basePageStyles from './basePageStyles';
export const styles = StyleSheet.create({
  container: {
    ...basePageStyles.container,
    padding: 16,
  },
  scrollViewContentContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
  cardCover: {
    padding: 16,
    backgroundColor: 'transparent',
    height: 128,
  },
  cardTitle: {
    textAlign: 'center',
  },
  viewOfButtons: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewOfInputs: {rowGap: 10},
});
