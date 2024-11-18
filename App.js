import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import StackNavigator from './navigation/StackNavigator';
import "./global.css"


export default function App() {
  return (
      <StackNavigator/>
  );
}

