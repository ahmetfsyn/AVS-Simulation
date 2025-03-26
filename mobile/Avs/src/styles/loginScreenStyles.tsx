import {StyleSheet} from 'react-native';
import basePageStyles from './basePageStyles';
export const styles = StyleSheet.create({
  container: {
    ...basePageStyles.container,
    padding: 16,
    justifyContent: 'center',
  },
  cardCover: {
    padding: 16,
    backgroundColor: 'transparent',
    height: 128,
  },
  cardTitle: {
    textAlign: 'center',
  },
  rememberMeView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  buttonsView: {
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
