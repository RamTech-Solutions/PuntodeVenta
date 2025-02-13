import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordAnimation from '../../../components/PasswordAnimation';

export default function PasswordScreen({ navigation }) {
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
            className="p-5" />
          <AntDesign name="mail" size={24} color="black" className="mr-5" />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Reset password')}>
          <View className="bg-[#003F69] rounded-lg">
            <Text className="p-5 text-white text-lg font-bold text-center">Enviar correo</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  )
}