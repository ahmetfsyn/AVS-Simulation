/* eslint-disable react/react-in-jsx-scope */
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppRoutes from './src/routes/AppRoutes';
import {MD3DarkTheme, MD3LightTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {useMemo} from 'react';
import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
} from 'react-native-toast-message';
import NfcManager from 'react-native-nfc-manager';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {IAppTheme} from './src/models/AppTheme';

NfcManager.start();
const queryClient = new QueryClient();

export default function App() {
  const isDarkTheme = useColorScheme() === 'dark';

  const appTheme = useMemo<IAppTheme>(() => {
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
        info: '#00AEEF',
      },
    };
  }, [isDarkTheme]);

  const toastConfig = {
    success: (props: any) => (
      <SuccessToast
        {...props}
        style={{
          borderLeftColor: appTheme.colors.success,
          backgroundColor: appTheme.colors.onBackground,
          borderRightColor: appTheme.colors.success,
          borderRightWidth: 5,
        }}
        text1Style={{
          fontSize: 12,
          color: 'black',
        }}
        text2Style={{
          fontSize: 12,
          color: 'black',
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: appTheme.colors.error,
          backgroundColor: appTheme.colors.onBackground,
          borderRightColor: appTheme.colors.error,
          borderRightWidth: 5,
        }}
        text1Style={{
          fontSize: 12,
          color: 'black',
        }}
        text2Style={{
          fontSize: 12,
          color: 'black',
        }}
      />
    ),
    info: (props: any) => (
      <InfoToast
        {...props}
        style={{
          borderLeftColor: appTheme.colors.info,
          backgroundColor: appTheme.colors.onBackground,
          borderRightColor: appTheme.colors.info,
          borderRightWidth: 5,
        }}
        text1Style={{
          fontSize: 12,
          color: 'black',
        }}
        text2Style={{
          fontSize: 12,
          color: 'black',
        }}
      />
    ),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={appTheme}>
        <GestureHandlerRootView
          style={{flex: 1, backgroundColor: appTheme.colors.background}}>
          <AppRoutes />
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </PaperProvider>
    </QueryClientProvider>
  );
}
