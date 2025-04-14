import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from 'react-native-paper';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {createStackNavigator} from '@react-navigation/stack';
import ServicePointsScreen from '../screens/Home/ServicePointsScreen';
import PayForKioskScreen from '../screens/Home/PayForKioskScreen';
import NfcReaderToAddWaterCardScreen from '../screens/Home/NfcReaderToAddWaterCardScreen';
import MyCardsScreen from '../screens/Home/MyCardsScreen';
import FeedbackScreen from '../screens/Home/FeedbackScreen';
import LoadCreditInfoScreen from '../screens/Home/LoadCreditInfoScreen';
import NfcReaderToLoadCreditScreen from '../screens/Home/NfcReaderToLoadCreditScreen';
import NfcReaderToWriteCreditToWaterCardScreen from '../screens/Home/NfcReaderToWriteCreditToWaterCardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ServicePoints" component={ServicePointsScreen} />
      <Stack.Screen name="PayForKiosk" component={PayForKioskScreen} />
      <Stack.Screen
        name="NfcReaderToAddWaterCard"
        component={NfcReaderToAddWaterCardScreen}
      />
      <Stack.Screen name="MyCards" component={MyCardsScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="LoadCreditInfo" component={LoadCreditInfoScreen} />
      <Stack.Screen
        name="NfcReaderToLoadCredit"
        component={NfcReaderToLoadCreditScreen}
      />
      <Stack.Screen
        name="NfcReaderToWriteCreditToWaterCard"
        component={NfcReaderToWriteCreditToWaterCardScreen}
      />
    </Stack.Navigator>
  );
};

const TabRoutes: React.FC = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderColor: 'transparent',
        },

        animation: 'fade',
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="home"
              color={theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="user-alt"
              color={theme.colors.onBackground}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
