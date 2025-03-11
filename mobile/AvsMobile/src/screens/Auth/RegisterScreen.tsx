import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  Button,
  Card,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import CustomTextInput from "../../components/TextInput/CustomTextInput";
import CustomButton from "../../components/Button/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";

const tcKimlikNoLength = 11;
const passwordMaxLength = 24;
const passwordMinLength = 6;

const validationSchema = Yup.object({
  tcKimlikNo: Yup.string()
    .required("Lütfen T.C kimlik numaranızı giriniz.")
    .length(tcKimlikNoLength, "T.C kimlik numarası 11 haneli olmalıdır."),
  email: Yup.string()
    .email("Lütfen geçerli bir email giriniz.")
    .required("Lütfen email adresinizi giriniz."),
  password: Yup.string()
    .required("Lütfen parolanızı giriniz.")
    .min(passwordMinLength)
    .max(passwordMaxLength),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Parolalar eşleşmiyor.")
    .required("Lütfen parolanızı tekrar giriniz."),
});

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onPressSignIn = () => {
    navigation.canGoBack() ? navigation.goBack() : null;
  };

  const onPressSignUp = (values) => {
    console.log(values);
    try {
    } catch (error) {}
    setLoading(true);
    setLoading(false);

    navigation.navigate("App");
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    loginCard: {
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card style={styles.loginCard}>
          <Card.Cover
            resizeMode="contain"
            source={require("../../../assets/bel-logo.png")}
            style={{
              padding: 8,
              backgroundColor: "transparent",
              height: 128,
            }}
          ></Card.Cover>
          <Card.Title
            title="KAYIT OL"
            titleStyle={{
              textAlign: "center",
            }}
            titleVariant="titleLarge"
          />
          <Card.Content>
            <Formik
              initialValues={{
                tcKimlikNo: "",
                password: "",
                email: "",
                confirmPassword: "",
              }}
              onSubmit={onPressSignUp}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{ rowGap: 10 }}>
                  <CustomTextInput
                    mode="flat"
                    inputMode="decimal"
                    placeholder="T.C Kimlik No"
                    onChangeText={handleChange("tcKimlikNo")}
                    onBlur={handleBlur("tcKimlikNo")}
                    maxLength={tcKimlikNoLength}
                    value={values.tcKimlikNo}
                    error={touched.tcKimlikNo && errors.tcKimlikNo}
                  />
                  <CustomTextInput
                    mode="flat"
                    inputMode="email"
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={touched.email && errors.email}
                  />
                  <CustomTextInput
                    mode="flat"
                    placeholder="Parola"
                    inputMode="text"
                    secureTextEntry
                    maxLength={passwordMaxLength}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={touched.password && errors.password}
                  />
                  <CustomTextInput
                    mode="flat"
                    placeholder="Parola Tekrar"
                    inputMode="text"
                    secureTextEntry
                    maxLength={passwordMaxLength}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                  <View
                    style={{
                      gap: 10,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <CustomButton
                      mode="contained-tonal"
                      onPress={onPressSignIn}
                    >
                      Giriş
                    </CustomButton>
                    <CustomButton
                      mode="contained"
                      style={{
                        flex: 1,
                      }}
                      loading={loading}
                      disabled={loading}
                      onPress={handleSubmit}
                    >
                      Kayıt Ol
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

export default RegisterScreen;
