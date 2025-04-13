import React from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import StackRoutes from './StackRoutes';
import {useTheme} from 'react-native-paper';

const AppRoutes: React.FC = () => {
  const theme = useTheme();

  const combinedTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: theme.colors.background,
      text: theme.colors.onSurface,
    },
  };

  return (
    <NavigationContainer theme={combinedTheme}>
      <StackRoutes />
    </NavigationContainer>
  );
};

export default AppRoutes;
