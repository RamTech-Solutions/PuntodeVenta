import { View, Text, Image, TouchableOpacity, Switch } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInputs from '../../../components/TextInputs'
import '../../../global.css'
export default function CustomApp({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <SafeAreaView className="flex-1 justify-between">
      <View>
        <Text className="text-[#003F69] font-bold text-[20px] ml-5">Logo</Text>
        <View className="justify-center items-center">
          <Image
            source={{ uri: "https://placehold.jp/200x200.png" }}
            className="rounded-full w-[200px] h-[200px]"
          />
        </View>
      </View>

      <View className="gap-5">
        <View className="justify-center mx-5">
          <TextInputs
            titulo="Nombre de la empresa"
            placeHolder="RamTech Solutions"

          />
        </View>

        <View className="mx-5 flex-row justify-between">
          <Text className="text-[#2A3256] font-bold text-[16px] ">
            Modo Oscuro
          </Text>
          <Switch
            trackColor={{ false: '#81b0ff', true: '#767577' }}
            thumbColor={isEnabled ? '#f4f3f4' : '#f5dd4b'}
            ios_backgroundColor="#81b0ff"
            onValueChange={toggleSwitch}
            value={isEnabled} />
        </View>
      </View>

      <View className="justify-center items-center gap-5 ">
        <TouchableOpacity>
          <View className="bg-[#003F69] items-center justify-center w-96 p-5 rounded-lg">
            <Text className="text-white font-bold">Guardar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Configuración")}>
          <View className="flex-row justify-center items-center w-96 p-5 border border-red-600 mb-5 rounded-lg ">
            <Text className="text-red-600 font-bold">Cancelar</Text>
          </View>
        </TouchableOpacity>

      </View>


    </SafeAreaView>
  )
}