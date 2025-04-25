import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SuccessAnimation from '../../components/SuccessAnimation'
import '../../global.css'
import { useRoute } from '@react-navigation/native'


export default function PaymentSuccessful({ navigation }) {
    const route =  useRoute();
    const { paymentMethod, change } = route.params || {};

    return (
        <SafeAreaView className="flex-1 justify-between ">
            <View className="justify-center items-center">
                <SuccessAnimation />
                <Text className="text-2xl font-bold text-[#003F69]">Compra exitosa!</Text>
            </View>
            <View className="justify-center items-center mx-5">
                <View className="bg-[#003f69] w-96 p-4 rounded-lg">
                    <Text className="font-bold text-white text-xl text-center">Método de pago: {paymentMethod}</Text>
                    <View className="border-b border-white my-5" />
                    <Text className="font-bold text-white text-xl text-center">Cambio de dinero: ${ change }</Text>
                </View>
            </View>
            <View className="justify-center items-center gap-5">
                <View className=" border border-[#157a8c] w-96 p-5 items-center rounded-lg">
                    <TextInput
                        placeholder='Email'></TextInput>
                </View>
                <TouchableOpacity>
                    <View className="bg-[#d9e2e9] w-80 p-4 rounded-lg">
                        <Text className="text-[#106B87] text-lg font-bold text-center">Enviar recibo</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="justify-center items-center">
                <View className="w-96 bg-[#003F69] p-2 rounded-b-full" />
                <View className="w-80 bg-[#157a8c] p-2 rounded-b-[100px]" />
            </View>

            <View className="justify-center items-center gap-5">
                <TouchableOpacity>
                    <View className="w-96 border-2 border-[#003F69] p-5 rounded-lg">
                        <Text className="text-center font-bold text-[#003F69]">Imprimir recibo</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=> navigation.navigate('Dashboard')}>
                    <View className="w-96  bg-[#003F69] p-5 rounded-lg">
                        <Text className="text-center font-bold text-white">Siguiente Compra</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}