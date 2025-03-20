import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppRoutes from './src/routes/AppRoutes';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {
  SafeAreaView,
  StatusBar,
  Platform,
  useColorScheme,
  View,
} from 'react-native';
import {useMemo} from 'react';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

interface AppTheme {
  colors: {
    background: string;
    onBackground: string;
    primary: string;
    secondary: string;
  };
}

export default function App() {
  const isDarkTheme = useColorScheme() === 'dark';
  console.log(isDarkTheme);
  const appTheme = useMemo<AppTheme>(() => {
    const baseTheme = isDarkTheme ? MD3DarkTheme : MD3LightTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: isDarkTheme ? '#003559' : '#fff',
        primary: isDarkTheme ? '#AECBE7' : '#fff',
        secondary: isDarkTheme ? '#11264B' : '#fff',
        onSurface: isDarkTheme ? '#edf2f4' : '#fff',
        onPrimary: isDarkTheme ? '#11264B' : '#fff',
        onSecondary: isDarkTheme ? '#AECBE7' : '#fff',
        cardBackground: isDarkTheme ? '#00436E' : '#fff',
        error: '#EF6B7C',
        success: 'lightgreen',
        warning: '#FFC107',
      },
    };
  }, [isDarkTheme]);

  return (
    <PaperProvider theme={appTheme}>
      <GestureHandlerRootView
        style={{flex: 1, backgroundColor: appTheme.colors.background}}>
        {/* Android için StatusBar yüksekliği kadar boşluk bırakıyoruz */}
        <View
          style={{
            height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        />

        {/* StatusBar ayarları */}
        {/* <ExpoStatusBar
          style={isDarkTheme ? "light" : "dark"}
          backgroundColor={appTheme.colors.background}
        /> */}
        <AppRoutes />
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
