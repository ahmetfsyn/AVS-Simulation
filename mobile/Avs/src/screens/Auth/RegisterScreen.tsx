/* eslint-disable react/react-in-jsx-scope */

import {useNavigation} from '@react-navigation/native';
import {RegisterParams} from '../../models/types/AuthParams';
import {useSignUp} from '../../hooks/useSignUp';
import {ScrollView} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {styles} from '../../styles/registerScreenStyles';
import {Formik} from 'formik';
import {
  passwordMaxLength,
  tcNoLength,
  validationSchema,
} from '../../validations/RegisterValidations';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import {View} from 'react-native';
import CustomButton from '../../components/Button/CustomButton';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const {loading, signUp} = useSignUp();
  const onPressSignIn = (): void => {
    navigation.canGoBack() ? navigation.goBack() : null;
  };

  const formikInitialValues: RegisterParams = {
    confirmPassword: '',
    tcNo: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: ['User'],
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContentContainer}>
      {/* Card of register */}
      <Card>
        <Card.Cover
          resizeMode="contain"
          source={require('../../../assets/TarsusBelediyesi/bel-logo.png')}
          style={styles.cardCover}
        />
        <Card.Title
          title="Kayıt Ol"
          titleStyle={styles.cardTitle}
          titleVariant="titleLarge"
        />
        <Card.Content>
          <Formik
            initialValues={formikInitialValues}
            onSubmit={signUp}
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
              // View of inputs
              <View style={styles.viewOfInputs}>
                <CustomTextInput
                  inputMode="decimal"
                  placeholder="Ad"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  error={touched.firstName && errors.firstName}
                />
                <CustomTextInput
                  inputMode="decimal"
                  placeholder="Soyad"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  error={touched.lastName && errors.lastName}
                />
                <CustomTextInput
                  inputMode="numeric"
                  placeholder="T.C Kimlik Numarası"
                  onChangeText={handleChange('tcNo')}
                  onBlur={handleBlur('tcNo')}
                  value={values.tcNo}
                  maxLength={tcNoLength}
                  error={touched.tcNo && errors.tcNo}
                />

                <CustomTextInput
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
                    disabled={loading || !isValid}
                    onPress={() => handleSubmit()}>
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
