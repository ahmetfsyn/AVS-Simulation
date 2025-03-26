import React, {useState} from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {signUp} from '../../redux/slices/appSlice';
import {IUser} from '../../models/User';
import {
  passwordMaxLength,
  tcNoLength,
  validationSchema,
} from '../../validations/RegisterValidations';
import {styles} from '../../styles/registerScreenStyles';

const RegisterScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}>
      {/* Card of register */}
      <Card>
        <Card.Cover
          resizeMode="contain"
          source={require('../../../assets/bel-logo.png')}
          style={styles.cardCover}
        />
        <Card.Title
          title="KAYIT OL"
          titleStyle={styles.cardTitle}
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
              // View of inputs
              <View style={styles.viewOfInputs}>
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

                {/* View of buttons */}
                <View style={styles.viewOfButtons}>
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
