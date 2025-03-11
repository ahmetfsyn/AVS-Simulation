import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppRoutes from "./src/routes/AppRoutes";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { useColorScheme } from "react-native";
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
        background: isDarkTheme ? "#2b2d42" : "#",
        primary: isDarkTheme ? "#A5B0C0" : "#",
        secondary: isDarkTheme ? "#2b2d42" : "#",
        onSurface: isDarkTheme ? "#edf2f4" : "",
        onPrimary: isDarkTheme ? "#2b2d42" : "",
        onSecondary: isDarkTheme ? "#A5B0C0" : "",
        cardBackground: isDarkTheme ? "#383B50" : "",
        error: "#EF6B7C",
      },
    };
  }, [isDarkTheme]);

  return (
    <PaperProvider theme={appTheme}>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: appTheme.colors.background }}
      >
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
        <AppRoutes />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
