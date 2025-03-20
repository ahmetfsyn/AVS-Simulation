import React from "react";
import { Button, ButtonProps, useTheme } from "react-native-paper";

interface CustomButtonProps extends ButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = ({
  style,
  mode = "contained", // Varsayılan değer "contained"
  ...props
}) => {
  const theme = useTheme();

  // 📌 Mode'a göre buton stillerini belirleme
  const styles = {
    contained: {
      backgroundColor: theme.colors.primary, // Temadan gelen ana renk
    },
    "contained-tonal": {
      backgroundColor: theme.colors.secondary, // Material 3 için uygun renk
    },
    text: {},
  };

  return (
    <Button
      {...props}
      mode={mode} // Doğru mode değerini kullan
      style={[styles[mode as keyof typeof styles] || {}, style]} // Stil uygulama
      labelStyle={{
        color:
          mode === "contained-tonal" || mode === "text"
            ? theme.colors.onSecondary // Arka planın zıt rengi
            : theme.colors.onPrimary, // Diğer modlar için yazı rengi
      }}
    />
  );
};

export default CustomButton;
