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
        background: isDarkTheme ? "#2b2d42" : "#ffffff",
        primary: isDarkTheme ? "#A5B0C0" : "#6200ee",
        secondary: isDarkTheme ? "#2b2d42" : "#03dac6",
        onSurface: isDarkTheme ? "#edf2f4" : "#000000",
        onPrimary: isDarkTheme ? "#2b2d42" : "#ffffff",
        onSecondary: isDarkTheme ? "#A5B0C0" : "#000000",
        cardBackground: isDarkTheme ? "#383B50" : "#f5f5f5",
        error: "#EF6B7C",
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
