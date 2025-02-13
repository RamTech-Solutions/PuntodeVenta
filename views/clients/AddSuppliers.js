import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInputs from '../../components/TextInputs'
import '../../global.css'

export default function AddSuppliers({ navigation }) {
    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="mx-5 gap-5">
                <Text className="text-[#003F69] font-bold text-[20px]">Detalles del proveedor</Text>
                <TextInputs
                    titulo="Nombre del proveedor"
                    placeHolder="Nombre ejemplo" />

                <TextInputs
                    titulo="Número de telefono"
                    placeHolder="+52 (xxx)-xxx-xxxx" />

                <TextInputs
                    titulo="Email"
                    placeHolder="ejemplo@gmail.com" />
                <TextInputs
                    titulo="Categoría"
                    placeHolder="Snacks" />

            </View>
            <View className="justify-center items-center gap-5">
                <TouchableOpacity>
                    <View className="bg-[#003F69] p-5 w-96 items-center rounded-lg">
                        <Text className="text-white font-bold">Añadir proveedor</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Ver proveedores")}>
                    <View className="items-center p-5 w-96 rounded-lg border border-red-600">
                        <Text className="text-red-600 font-bold">Cancelar</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    )
}