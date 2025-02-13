import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import '../global.css'
import Feather from '@expo/vector-icons/Feather';

const ItemSale = () => {
    return (
        <View className="border border-[#157A8C] rounded-lg  ">
            <View className="">
                <View className="justify-end items-end m-1">
                    <TouchableOpacity>
                        <View className="bg-[#d9e2e9] p-2 rounded-full items-center justify-center  ">
                            <Feather name="x" size={20} color="#003F69" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="justify-center items-center ">
                    <Image
                        source={{ uri: 'https://placehold.jp/110x110.png' }}
                        className="w-[110px] h-[110px]"
                    />
                </View>


            </View>

            <View className="gap-5 mx-5">
                <Text className="font-bold text-[#003F69]">
                    Nombre del producto
                </Text>
                <Text className=" text-[#003F69] mb-5">
                    $8
                </Text>
            </View>
        </View>
    )
}

export default ItemSale