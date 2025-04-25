import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordAnimation from '../../../components/PasswordAnimation';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function PasswordScreen({ navigation }) {

  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.navigate('Reset password'); 
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'No se pudo enviar el correo de recuperación. Verifica que el correo sea válido.');
      });
  };

  return (
    <SafeAreaView className="flex-1 justify-between m-5 gap-10">

      <View className="gap-5">
        <Text className="text-3xl font-bold">Cambiar tu contraseña</Text>
        <Text>Ingresa el email asociado a tu cuenta y te enviaremos un correo con instrucciones para cambiar tu contraseña</Text>
      </View>
      <View className="items-center justify-center">
        <PasswordAnimation />
      </View>

      <View className="gap-5">
        <Text className="text-2xl font-bold">Correo electrónico</Text>
        <View className=" flex flex-row items-center border-[2px] border-gray-400 rounded-lg justify-between">
          <TextInput
            placeholder='tucorreo@ejemplo.com'
            inputMode='email'
            className="p-5"
            onChangeText={setEmail} />
          <AntDesign name="mail" size={24} color="black" className="mr-5" />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={handleResetPassword}>
          <View className="bg-[#003F69] rounded-lg">
            <Text className="p-5 text-white text-lg font-bold text-center">Enviar correo</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}