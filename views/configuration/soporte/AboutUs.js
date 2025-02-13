import { View, Text, Image, TouchableOpacity, ScrollView, Linking } from 'react-native'
import React from 'react'
import '../../../global.css'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AboutUs({ navigation }) {
  return (

    <ScrollView className="flex-1 gap-5 ">
      <View className="ml-5 mt-6">
        <TouchableOpacity onPress={()=> navigation.navigate('Configuración')}>
          <View>
            <AntDesign name="left" size={24} color="#003F69" />
          </View>
        </TouchableOpacity>
      </View>

      <View className="justify-center items-center gap-10">
        <Text className="font-bold text-[#003F69] text-2xl">Acerca de nosotros</Text>
        <Image
          source={require('../../../assets/Logo_Ramtech.png')}
          className="w-[300px] h-[175px]"
        />
      </View>

      <View className="mx-5 mt-5 gap-5">
        <Text className="font-bold text-xl text-[#003F69]">¿Quienes somos?</Text>
        <Text className="text-lg text-gray-500 text-start">Empresa dedicada al Desarrollo Web, mantenimiento, Hosting y soluciones de software. Nuestro equipo de expertos ofrece servicios integrales para ayudar a tu negocio a destacarse en el mundo digital.</Text>

        <Text className="font-bold text-xl text-[#003F69] ">Nuestra misión</Text>
        <Text className="text-lg text-gray-500 text-start">En RamTech Solutions, nos dedicamos a ofrecer soluciones innovadoras que simplifiquen la vida de nuestros clientes. Creemos en el poder de la tecnología para mejorar la experiencia de todos y nos comprometemos a brindar productos y servicios que inspiren confianza, calidad y sostenibilidad.</Text>

        <Text className="font-bold text-xl text-[#003F69] ">¿Te gustó lo que viste?</Text>
        <Text className="text-lg text-gray-500 text-start">¿Te ha gustado lo que ves? Visita nuestra página para explorar más de nuestros proyectos y ver cómo podemos ayudarte a llevar tu idea al siguiente nivel. </Text>

      </View>
      <View className="justify-center items-center mt-[20px] mb-[20px]">
        <TouchableOpacity onPress={() => Linking.openURL('https://ramtechsolutions.com.mx/')}>
          <View className="bg-[#003F69] p-5 rounded-lg">
            <Text className="font-bold text-white">Visitar ahora</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}