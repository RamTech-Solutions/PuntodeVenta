import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '../global.css'
import { useNavigation } from '@react-navigation/native'

const AddProduct = () => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={()=> navigation.navigate("Escanear Productos",{ mode: 'addToBasket' })} >
            <View className="border border-[#157A8C] justify-center items-center h-[210px] w-[183px] rounded-lg ">
                <Text className="font-bold text-1xl text-[#003F69]">Añadir producto</Text>
            </View>
        </TouchableOpacity>

    )
}

export default AddProduct