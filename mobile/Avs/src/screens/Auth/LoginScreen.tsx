/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, View} from 'react-native';
import {LoginParams} from '../../models/types/AuthParams';
import {Card, Checkbox, Text} from 'react-native-paper';
import {styles} from '../../styles/loginScreenStyles';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useSignIn} from '../../hooks/useSignIn';
import {Formik} from 'formik';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import {validationSchema} from '../../validations/LoginValidations';
import {
  passwordMaxLength,
  tcNoLength,
} from '../../validations/RegisterValidations';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [rememberMe, setRememberMe] = useState(false);
  const {loading, signIn} = useSignIn();

  const formikInitialValues: LoginParams = {
    tcNo: '',
    password: '',
    rememberMe: rememberMe,
  };

  const onPressSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}>
      <Card mode="contained">
        <Card.Cover
          resizeMode="contain"
          source={require('../../../assets/TarsusBelediyesi/bel-logo.png')}
          style={styles.cardCover}
        />
        <Card.Title
          title="Giriş Yap"
          titleStyle={styles.cardTitle}
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Formik
            initialValues={formikInitialValues}
            onSubmit={signIn}
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View style={{rowGap: 10}}>
                <CustomTextInput
                  label={'T.C. Kimlik Numarası'}
                  mode="flat"
                  inputMode="numeric"
                  placeholder="T.C. kimlik numaranızı giriniz"
                  onChangeText={handleChange('tcNo')}
                  onBlur={handleBlur('tcNo')}
                  value={values.tcNo}
                  error={touched.tcNo && errors.tcNo}
                  maxLength={tcNoLength}
                />
                <CustomTextInput
                  mode="flat"
                  label={'Parola'}
                  placeholder="Parolanızı giriniz"
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
                  <CustomButton mode="contained-tonal" onPress={onPressSignUp}>
                    Kayıt
                  </CustomButton>
                  <CustomButton
                    mode="contained"
                    style={{
                      flex: 1,
                    }}
                    loading={loading}
                    disabled={loading || !isValid}
                    onPress={() => handleSubmit()}>
                    Giriş Yap
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

export default LoginScreen;
