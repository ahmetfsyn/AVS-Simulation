import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import TabRoutes from "./TabRoutes";

const Stack = createStackNavigator();

const StackRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} /> */}
      <Stack.Screen name="App" component={TabRoutes} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
