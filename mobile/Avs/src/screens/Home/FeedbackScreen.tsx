import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Card, Checkbox, Text} from 'react-native-paper';
import {Formik} from 'formik';
import CustomButton from '../../components/Button/CustomButton';
import CustomTextInput from '../../components/TextInput/CustomTextInput';

const FeedBackScreen: React.FC = () => {
  const onPressSubmit = () => {
    console.log('paylasildi');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 8,
          gap: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <Card>
          <Card.Content>
            <Text variant="bodyMedium">
              Öneri ve şikayetleriniz için aşağıdaki formu doldurarak bize
              bildirebilirsiniz.
            </Text>
          </Card.Content>
        </Card>
        <Card>
          <Card.Title
            title="Öneri ve Şikayet Formu"
            titleVariant="titleMedium"
          />

          <Card.Content>
            <Formik
              initialValues={{
                content: '',
                title: '',
              }}
              onSubmit={onPressSubmit}
              // validationSchema={validationSchema}
            >
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
                    inputMode="text"
                    multiline
                    placeholder="Başlık"
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    error={touched.title && errors.title}
                  />
                  <CustomTextInput
                    mode="flat"
                    inputMode="text"
                    multiline
                    placeholder="İçerik"
                    onChangeText={handleChange('content')}
                    onBlur={handleBlur('content')}
                    value={values.content}
                    error={touched.content && errors.content}
                  />
                  <CustomButton onPress={handleSubmit} mode="contained">
                    Gönder
                  </CustomButton>
                </View>
              )}
            </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

export default FeedBackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
