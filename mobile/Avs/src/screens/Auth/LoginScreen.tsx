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
  SafeAreaView,
} from "react-native";
import {
  Button,
  Card,
  Checkbox,
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
  password: Yup.string()
    .required("Lütfen parolanızı giriniz.")
    .min(passwordMinLength)
    .max(passwordMaxLength),
});

const LoginScreen: React.FC = () => {
  const { navigate } = useNavigation();
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const onPressSignIn = (values: { tcKimlikNo: string; password: string }) => {
    try {
    } catch (error) {}
    setLoading(true);
    setLoading(false);

    navigate("App");
  };

  const onPressSignUp = () => {
    navigate("Register");
  };

  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: "center",
    } as ViewStyle,
    loginCard: {
      borderRadius: 10,
      backgroundColor: theme.colors.cardBackground,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Card style={styles.loginCard}>
          <Card.Cover
            resizeMode="contain"
            source={require("../../../assets/bel-logo.png")}
            style={{
              padding: 16,
              backgroundColor: "transparent",
              height: 128,
            }}
          ></Card.Cover>
          <Card.Title
            title="GİRİŞ YAP"
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
                rememberMe: rememberMe,
              }}
              onSubmit={onPressSignIn}
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
                    placeholder="Parola"
                    inputMode="text"
                    secureTextEntry
                    maxLength={passwordMaxLength}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    error={touched.password && errors.password}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      status={rememberMe ? "checked" : "unchecked"}
                      onPress={() => {
                        setRememberMe(!rememberMe);
                      }}
                    />
                    <Text variant="labelLarge">Beni Hatırla</Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      position: "relative",
                    }}
                  >
                    <Text variant="labelLarge">Şifrenizi mi Unuttunuz?</Text>
                    <CustomButton
                      mode="text"
                      onPress={() => console.log("Şifremi Unuttum")}
                    >
                      Şifremi Unuttum
                    </CustomButton>
                  </View>
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
                      onPress={onPressSignUp}
                    >
                      Kayıt
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
