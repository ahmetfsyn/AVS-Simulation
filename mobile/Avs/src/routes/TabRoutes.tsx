import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";

import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Home/ProfileScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createStackNavigator } from "@react-navigation/stack";
import ServicePointsScreen from "../screens/Home/ServicePointsScreen";
import PayForKioskScreen from "../screens/Home/PayForKioskScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        name="ServicePoints"
        component={ServicePointsScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="PayForKiosk"
        component={PayForKioskScreen}
      ></Stack.Screen>
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
          borderColor: "transparent",
        },

        animation: "fade",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <FontAwesome5
              name="home"
              color={theme.colors.onBackground}
              size={24}
            ></FontAwesome5>
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
            ></FontAwesome5>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
