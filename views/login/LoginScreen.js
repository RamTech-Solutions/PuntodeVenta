import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import '../../global.css'
export default function LoginScreen({ navigation }) {
    return (
        <SafeAreaView className="flex-1 justify-around bg-white">
            {/* Header */}
            <View className="justify-center items-center">
                <Text className="text-[#003f69] text-3xl text-center font-semibold w-[200px]">Inicia sesión con tu cuenta</Text>
            </View>

            {/* Body */}
            <View className="">
                <View className="m-5 gap-5">
                    <Text>Correo</Text>
                    <TextInput className="w-[369px] h-[50px] items-start justify-center border border-[#003f69]  rounded-md p-5" placeholder='user@gmail.com'></TextInput>
                </View>

                <View className="m-5 gap-5">
                    <Text>Contraseña</Text>
                    <View className="w-[369px] h-[50px] border border-[#003f69]  rounded-md  flex flex-row items-center  justify-between">
                        <TextInput className="p-5 w-[300px]" placeholder='Contraseña' secureTextEntry={true}></TextInput>
                        <AntDesign className="mr-5" name="eye" size={22} color="#003f69" />
                    </View>
                    <TouchableOpacity>
                        <Text className="text-[#B3ACA4]">¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>


                <View className="justify-center items-center">
                    <TouchableOpacity>
                        <View className="justify-center items-center bg-[#003F69] w-[359px] h-[50px] rounded-lg">
                            <Text className="font-bold text-white">Iniciar Sesión</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                    <Text className="text-[#B3ACA4] m-5">¿No tienes cuenta? Registrate</Text>
                </TouchableOpacity>

            </View>

            {/* Footer */}
            <View className="justify-center items-center gap-5">
                <Text>Continuar con</Text>
                <TouchableOpacity>
                    <View className=" rounded-full border p-5 w-[60px] h-[60px]">
                        <AntDesign name="google" size={24} color="black" />
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    )
}