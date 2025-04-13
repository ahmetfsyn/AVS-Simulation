import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import TabRoutes from './TabRoutes';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

const StackRoutes: React.FC = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'default'}}>
      {accessToken ? (
        <Stack.Screen name="App" component={TabRoutes} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackRoutes;
