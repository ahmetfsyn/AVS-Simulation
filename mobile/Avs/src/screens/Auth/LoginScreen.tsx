import {
  Card,
  Checkbox,
  Text,
  CustomButton,
  CustomTextInput,
  Formik,
  ScrollView,
  View,
  passwordMaxLength,
  styles,
  validationSchema,
  useNavigation,
  useSignIn,
  React,
  useState,
} from '../../imports/LoginScreenImports';
import {LoginParams} from '../../models/types/AuthParams';

const LoginScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const {loading, signIn} = useSignIn();
  const formikInitialValues: LoginParams = {
    email: '',
    password: '',
    rememberMe: rememberMe,
  };

  const onPressSignUp = () => {
    navigate('Register');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}>
      <Card>
        <Card.Cover
          resizeMode="contain"
          source={require('../../../assets/bel-logo.png')}
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
                  mode="flat"
                  inputMode="email"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  error={touched.email && errors.email}
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
                    onPress={handleSubmit}>
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
