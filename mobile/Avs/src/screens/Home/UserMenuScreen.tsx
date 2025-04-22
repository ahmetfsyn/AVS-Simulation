import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Avatar, Card, useTheme} from 'react-native-paper';
import CustomButton from '../../components/Button/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootState} from '../../redux/store';
import {removeCredentials} from '../../redux/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

const UserMenuScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logout = () => {
    dispatch(removeCredentials());
  };
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Ayarlar" titleVariant="titleMedium" />
        <Card.Content
          style={{
            gap: 20,
          }}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Avatar.Text
              label={
                user! &&
                (
                  user.firstName?.substring(0, 1)! +
                  user.lastName?.substring(0, 1)!
                ).toUpperCase()
              }
              color={theme.colors.primary}
              style={{backgroundColor: theme.colors.secondary}}
            />
          </View>
          <CustomButton
            icon={() => (
              <FontAwesome5Icon
                name="user-alt"
                color={theme.colors.secondary}
                size={20}
              />
            )}
            onPress={() => navigation.navigate('ProfileEdit')}
            mode="contained">
            Bilgilerim
          </CustomButton>
          <CustomButton
            icon={() => (
              <MaterialCommunityIcons
                name="table"
                color={theme.colors.primary}
                size={20}
              />
            )}
            mode="contained-tonal">
            Geçmiş İşlemler
          </CustomButton>
          <CustomButton
            icon={() => (
              <MaterialCommunityIcons
                name="credit-card-multiple"
                color={theme.colors.secondary}
                size={20}
              />
            )}
            mode="contained">
            Banka/Kredi Kartlarım
          </CustomButton>

          <CustomButton
            style={{
              marginHorizontal: 'auto',
            }}
            icon={() => (
              <MaterialIcons
                name="exit-to-app"
                color={theme.colors.primary}
                size={20}
              />
            )}
            onPress={logout}
            mode="contained-tonal">
            Çıkış Yap
          </CustomButton>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 15,
    display: 'flex',
    justifyContent: 'center',
  },
});

export default UserMenuScreen;
