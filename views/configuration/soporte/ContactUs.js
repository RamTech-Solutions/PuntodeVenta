import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import '../../../global.css'
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ContactUs({ navigation }) {
  return (
    <View className="flex-1 gap-5">
      <View className="ml-5 mt-6">
        <TouchableOpacity onPress={() => navigation.navigate('Configuración')}>
          <View>
            <AntDesign name="left" size={24} color="#003F69" />
          </View>
        </TouchableOpacity>
      </View>
      <View className="mx-5">
        <Text className="text-lg text-gray-500 text-start">Puedes comunicarte con nosotros en las siguientes plataformas, nuestro equipo se contactara lo más pronto posible</Text>
      </View>
      <View className="mx-5 gap-5">
        <View className="bg-white shadow-sm rounded-lg gap-5 ">
          <Text className="mx-5 mt-5 font-bold">Nuestro correo, número y dirección</Text>
          <View className="flex flex-row ml-5 ">
            <View className="bg-gray-300 rounded-[40px] mr-5">
              <AntDesign name="phone" size={24} color="#808080" className="p-2" />
            </View>
            <View>
              <Text className="text-gray-500 font-semibold">Número de contacto</Text>
              <Text>56-16-21-69-89</Text>
            </View>
          </View>
          <View className="flex flex-row ml-5 mb-5">
            <View className="bg-gray-300 rounded-[40px] mr-5 items-center justify-center">
              <AntDesign name="mail" size={20} color="#003F69" className="p-[9px]" />
            </View>
            <View>
              <Text className="text-gray-500 font-semibold">Dirección de correo</Text>
              <Text>info@ramtechsolutions.com.mx </Text>
            </View>
          </View>
        </View>
        <View className="bg-white shadow-sm rounded-lg gap-5 ">
          <Text className="mx-5 mt-5 font-bold">Nuestras redes</Text>
          <View className="flex flex-row ml-5 ">
            <View className="bg-[#F70076] rounded-[40px] mr-5">
              <AntDesign name="instagram" size={24} color="white" className="p-2" />
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/ram.tech_solutions/')}>
              <View>
                <Text className="text-gray-500 font-semibold">Instagram</Text>
                <Text>@ram.tech_solutions</Text>
              </View>
            </TouchableOpacity>

          </View>
          <View className="flex flex-row ml-5">
            <View className="bg-[#0866FF] rounded-[40px] mr-5 items-center justify-center">
              <AntDesign name="facebook-square" size={24} color="white" className="p-2" />
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/people/RamTech-Solutions/61558465557267/?mibextid=ZbWKwL')}>
              <View>
                <Text className="text-gray-500 font-semibold">Facebook</Text>
                <Text>@RamTech Solutions  </Text>
              </View>
            </TouchableOpacity>

          </View>

          <View className="flex flex-row ml-5 mb-5">
            <View className="bg-[#0077B5] rounded-[40px] mr-5 items-center justify-center">
              <AntDesign name="linkedin-square" size={24} color="white" className="p-2" />
            </View>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/ramtechsolutions/')}>
              <View>
                <Text className="text-gray-500 font-semibold">LinkedIn</Text>
                <Text>@RamTech Solutions</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>

    </View>
  )
}