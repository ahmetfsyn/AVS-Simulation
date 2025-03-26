import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Card, Checkbox, Text, useTheme} from 'react-native-paper';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/slices/appSlice';
import {styles} from '../../styles/loginScreenStyles';
import {validationSchema} from '../../validations/LoginValidations';
import {
  passwordMaxLength,
  tcNoLength,
} from '../../validations/RegisterValidations';

const LoginScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const onPressSignIn = (values: {tcKimlikNo: string; password: string}) => {
    setLoading(true);
    try {
      dispatch(signIn(values));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    // navigate('App');
  };

  const onPressSignUp = () => {
    navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 100}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card>
          <Card.Cover
            resizeMode="contain"
            source={require('../../../assets/bel-logo.png')}
            style={styles.cardCover}
          />
          <Card.Title
            title="GİRİŞ YAP"
            titleStyle={styles.cardTitle}
            titleVariant="titleLarge"
          />
          <Card.Content>
            <Formik
              initialValues={{
                tcKimlikNo: '',
                password: '',
                rememberMe: rememberMe,
              }}
              onSubmit={onPressSignIn}
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
                    placeholder="T.C Kimlik No"
                    onChangeText={handleChange('tcKimlikNo')}
                    onBlur={handleBlur('tcKimlikNo')}
                    maxLength={tcNoLength}
                    value={values.tcKimlikNo}
                    error={touched.tcKimlikNo && errors.tcKimlikNo}
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
                  {/* View of remeber me */}
                  <View style={styles.rememberMeView}>
                    <Checkbox
                      status={rememberMe ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setRememberMe(!rememberMe);
                      }}
                    />
                    <Text variant="labelLarge">Beni Hatırla</Text>
                  </View>
                  {/* View of forgot password */}
                  <View style={styles.forgotPassword}>
                    <Text variant="labelLarge">Şifrenizi mi Unuttunuz?</Text>
                    <CustomButton
                      mode="text"
                      onPress={() => console.log('Şifremi Unuttum')}>
                      Şifremi Unuttum
                    </CustomButton>
                  </View>
                  {/* View of buttons */}
                  <View style={styles.buttonsView}>
                    <CustomButton
                      mode="contained-tonal"
                      onPress={onPressSignUp}>
                      Kayıt
                    </CustomButton>
                    <CustomButton
                      mode="contained"
                      style={{
                        flex: 1,
                      }}
                      loading={loading}
                      disabled={loading}
                      onPress={handleSubmit}>
                      Giriş Yap
                    </CustomButton>
                  </View>
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
