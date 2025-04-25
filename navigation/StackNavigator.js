import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../views/login/LoginScreen';
import RegisterScreen from '../views/login/RegisterScreen';
import MainMenu from '../views/main/MainMenu';
import ResetConfirmation from '../views/configuration/acciones/ResetConfirmation';
import PasswordScreen from '../views/configuration/acciones/PasswordScreen';
import PaymentSuccessful from '../views/sales/PaymentSuccessful';
import AuthContext from '../context/AuthContext';
import PasswordScreenLogin from '../views/configuration/acciones/PasswordScreenLogin';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  const { user } = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName={user ? "Dashboard" : "Login"} // Redirige si hay sesión activa
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={MainMenu} options={{ headerShown: false }} />
          <Stack.Screen name="Change password" component={PasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Reset password" component={ResetConfirmation} options={{ headerShown: false }} />
          <Stack.Screen name="Payment Successful" component={PaymentSuccessful} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animation: 'slide_from_left' }} />
          <Stack.Screen name="Forgot password" component={PasswordScreenLogin} options={{ headerShown: false, animation: 'slide_from_left' }} />
        </>
      )}
    </Stack.Navigator>
  );
}
