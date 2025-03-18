import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppRoutes from "./src/routes/AppRoutes";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import {
  SafeAreaView,
  StatusBar,
  Platform,
  useColorScheme,
  View,
} from "react-native";
import { useMemo } from "react";
import nfcManager from "react-native-nfc-manager";

interface AppTheme {
  colors: {
    background: string;
    onBackground: string;
    primary: string;
    secondary: string;
  };
}

export default function App() {
  const isDarkTheme = useColorScheme() === "dark";

  const appTheme = useMemo<AppTheme>(() => {
    const baseTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: isDarkTheme ? "#003559" : "",
        primary: isDarkTheme ? "#AECBE7" : "",
        secondary: isDarkTheme ? "#11264B" : "",
        onSurface: isDarkTheme ? "#edf2f4" : "",
        onPrimary: isDarkTheme ? "#11264B" : "",
        onSecondary: isDarkTheme ? "#AECBE7" : "",
        cardBackground: isDarkTheme ? "#00436E" : "",
        error: "#EF6B7C",
        success: "lightgreen",
        warning: "#FFC107",
      },
    };
  }, [isDarkTheme]);

  return (
    <PaperProvider theme={appTheme}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: appTheme.colors.background }}
      >
        {/* Android için StatusBar yüksekliği kadar boşluk bırakıyoruz */}
        <View
          style={{
            height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        />

        {/* StatusBar ayarları */}
        <ExpoStatusBar
          style={isDarkTheme ? "light" : "dark"}
          backgroundColor={appTheme.colors.background}
        />
        <AppRoutes />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
