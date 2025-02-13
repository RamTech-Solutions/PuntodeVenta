import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '../../../global.css'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ResetConfirmation( {navigation }) {
    return (
        <View className=" flex-1 justify-center items-center gap-5">
            <View className="bg-[#003F69] p-10 rounded-lg">
                <Ionicons name="mail-open-outline" size={50} color="white" />
            </View>
            <View>
              <Text className="font-bold text-2xl text-center">Revisa la bandeja de tu correo</Text>
              <Text className="text-center mx-5 text-lg">Hemos enviado las instrucciones para cambiar tu contraseña</Text>  
              <Text className="text-center mx-5 text-lg">Debido a que harás un cambio de contraseña deberás volver a iniciar sesión, si no hiciste algún cambio solo vuelve a ingresar tu información</Text>
            </View>
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate ('Login')}>
                    <View className="bg-[#003F69] rounded-lg p-5">
                        <Text className="text-white font-bold">
                            Continuar
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}