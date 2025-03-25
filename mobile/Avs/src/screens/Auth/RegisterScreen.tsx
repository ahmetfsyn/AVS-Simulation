import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Card, useTheme} from 'react-native-paper';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {signUp} from '../../redux/slices/appSlice';
import {IUser} from '../../models/User';

const tcNoLength = 11;
const passwordMaxLength = 24;
const passwordMinLength = 6;

const validationSchema = Yup.object({
  firstName: Yup.string().required('Lütfen adınızı giriniz.'),
  lastName: Yup.string().required('Lütfen soyadınızı giriniz.'),
  tcNo: Yup.string()
    .required('Lütfen T.C kimlik numaranızı giriniz.')
    .length(tcNoLength, 'T.C kimlik numarası 11 haneli olmalıdır.'),
  password: Yup.string()
    .required('Lütfen parolanızı giriniz.')
    .min(passwordMinLength)
    .max(passwordMaxLength),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Parolalar eşleşmiyor.')
    .required('Lütfen parolanızı tekrar giriniz.'),
});

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onPressSignIn = () => {
    navigation.canGoBack() ? navigation.goBack() : null;
  };

  const onPressSignUp = (values: any): void => {
    try {
      setLoading(true);
      dispatch(signUp({...values, id: Math.floor(Math.random() * 1000)}));
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    } as ViewStyle,
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        display: 'flex',
        justifyContent: 'center',
        marginVertical: 'auto',
      }}>
      <Card>
        <Card.Cover
          resizeMode="contain"
          source={require('../../../assets/bel-logo.png')}
          style={{
            padding: 16,
            backgroundColor: 'transparent',
            height: 128,
          }}
        />
        <Card.Title
          title="KAYIT OL"
          titleStyle={{
            textAlign: 'center',
          }}
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Formik
            initialValues={{
              tcNo: '',
              password: '',
              confirmPassword: '',
              firstName: '',
              lastName: '',
            }}
            onSubmit={onPressSignUp}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{rowGap: 10}}>
                <CustomTextInput
                  mode="flat"
                  inputMode="decimal"
                  placeholder="Ad"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  error={touched.firstName && errors.firstName}
                />
                <CustomTextInput
                  mode="flat"
                  inputMode="decimal"
                  placeholder="Soyad"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  error={touched.lastName && errors.lastName}
                />
                <CustomTextInput
                  mode="flat"
                  inputMode="decimal"
                  placeholder="T.C Kimlik No"
                  onChangeText={handleChange('tcNo')}
                  onBlur={handleBlur('tcNo')}
                  maxLength={tcNoLength}
                  value={values.tcNo}
                  error={touched.tcNo && errors.tcNo}
                />

                <CustomTextInput
                  mode="flat"
                  placeholder="Parola"
                  inputMode="text"
                  secureTextEntry
                  maxLength={passwordMaxLength}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={touched.password && errors.password}
                />
                <CustomTextInput
                  mode="flat"
                  placeholder="Parola Tekrar"
                  inputMode="text"
                  secureTextEntry
                  maxLength={passwordMaxLength}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  error={touched.confirmPassword && errors.confirmPassword}
                />
                <View
                  style={{
                    gap: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <CustomButton mode="contained-tonal" onPress={onPressSignIn}>
                    Giriş
                  </CustomButton>
                  <CustomButton
                    mode="contained"
                    style={{
                      flex: 1,
                    }}
                    loading={loading}
                    disabled={loading}
                    onPress={handleSubmit}>
                    Kayıt Ol
                  </CustomButton>
                </View>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default RegisterScreen;
