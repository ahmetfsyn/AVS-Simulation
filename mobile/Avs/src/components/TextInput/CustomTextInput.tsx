import React from "react";
import {
  HelperText,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";

interface CustomTextInputProps extends TextInputProps {
  error?: string | boolean; // Formik'ten gelen hata mesajı
}
const CustomTextInput: React.FC<CustomTextInputProps> = ({
  style,
  error,
  ...props
}) => {
  const theme = useTheme();
  return (
    <>
      <TextInput
        {...props}
        placeholderTextColor={"#979797"}
        underlineColor={"#979797"}
        style={[
          {
            backgroundColor: "transparent",
            color: theme.colors.onSurface,
          },
          style,
        ]} // Kullanıcıdan gelen style'ları ekliyoruz
      />
      {error && <HelperText type="error">{error}</HelperText>}
    </>
  );
};

export default CustomTextInput;
