import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditSuppliers({ navigation, route }) {
    const { item, deleteItem } = route.params;
    const itemID = item.id;

    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="mx-5 gap-5">
                <Text className="text-[#003F69] font-bold text-[20px]">Editar información del proveedor</Text>
                <TextInputs
                    titulo="Nombre del proveedor"
                    placeHolder={item.name} />

                <TextInputs
                    titulo="Número de telefono"
                    placeHolder={item.phone} />

                <TextInputs
                    titulo="Email"
                    placeHolder={item.email} />
                <TextInputs
                    titulo="Categoría"
                    placeHolder={item.category} />

            </View>
            <View className="justify-center items-center gap-5">
                <TouchableOpacity>
                    <View className="bg-[#003F69] p-5 w-96 items-center rounded-lg">
                        <Text className="text-white font-bold">Editar proveedor</Text>
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