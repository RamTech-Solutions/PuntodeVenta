import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ProductProvider>

    </AuthProvider>

  );
}

