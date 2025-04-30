import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar, Card, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Formik} from 'formik';
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButton from '../../components/Button/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInputPhoneMask from '../../components/TextInput/CustomInputPhoneMask';
import {validationSchema} from '../../validations/ProfileEditValidations';
import {useUpdateProfile} from '../../hooks/useUpdateProfile';

const ProfileEditScreen: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const theme = useTheme();
  const {useUpdateProfileLoading, updateUserAsync} = useUpdateProfile();

  const formikInitialValues = {
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  };

  const onSubmit = (values: any) => {
    updateUserAsync({userId: user?.id, data: values});
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Title title="Bilgilerim" titleVariant="titleMedium" />
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

        <Formik
          initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <Card.Content>
              <CustomTextInput
                mode="flat"
                label={'Ad Soyad'}
                value={user?.firstName + ' ' + user?.lastName}
                readOnly
              />
              <CustomTextInput
                mode="flat"
                label={'T.C. Kimlik Numarası'}
                inputMode="numeric"
                value={user?.tcNo || '12312312311'}
                readOnly
              />
              <CustomTextInput
                mode="flat"
                label={'E-mail'}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                // helperText={touched.email ? errors.email : ''}
              />
              <CustomTextInput
                label="Telefon Numarası"
                value={values.phoneNumber}
                onBlur={handleBlur('phoneNumber')}
                keyboardType="numeric"
                error={touched.phoneNumber && errors.phoneNumber}
                // helperText={touched.phoneNumber && errors.phoneNumber }
                render={props => (
                  <CustomInputPhoneMask
                    {...props}
                    setFieldValue={setFieldValue}
                    fieldName="phoneNumber"
                    mask={[
                      '(',
                      /[5]/,
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                      ' ',
                      /\d/,
                      /\d/,
                    ]}
                  />
                )}
              />

              <Card.Actions
                style={{
                  alignSelf: 'center',
                }}>
                <CustomButton
                  icon={() => (
                    <MaterialCommunityIcons
                      name="content-save"
                      size={24}
                      color={theme.colors.secondary}
                    />
                  )}
                  mode="contained"
                  loading={useUpdateProfileLoading}
                  disabled={!isValid || useUpdateProfileLoading}
                  onPress={() => handleSubmit()}>
                  Kaydet
                </CustomButton>
              </Card.Actions>
            </Card.Content>
          )}
        </Formik>
      </Card>
    </ScrollView>
  );
};

export default ProfileEditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
