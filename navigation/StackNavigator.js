import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../views/login/LoginScreen';
import RegisterScreen from '../views/login/RegisterScreen';
import MainMenu from '../views/main/MainMenu';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          gestureEnabled: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: 'slide_from_left' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="Dashboard" component={MainMenu} options={{ headerShown: false, animation: 'default' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
