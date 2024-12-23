import { View, Text, TouchableOpacity } from 'react-native'
import '../../global.css'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'

export default function DashboardMain() {
    return (
        <View className="flex-1 justify-between">

            <View className="m-5">
                <Text className="font-bold text-[20px]">Acciones Rapidas</Text>

                <View className="mt-10">
                    <View className="flex-row justify-evenly mb-10">
                        <TouchableOpacity>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C]">
                                <Fontisto name="shopping-basket-add" size={20} color="#003F69" />
                                <View className="flex-col">
                                    <Text className="text-[15px]">Agregar</Text>
                                    <Text className="text-[15px]">articulo</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C]">
                                <Ionicons name="person-add" size={20} color="#003F69" />
                                <View className="flex-col">
                                    <Text className="text-[15px]">Agregar </Text>
                                    <Text className="text-[15px]">empleado</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View className="flex-row justify-evenly">
                        <TouchableOpacity>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C]">
                                <AntDesign name="barschart" size={20} color="#003F69" />

                                <View className="flex-col">
                                    <Text className="text-[15px]">Resumen </Text>
                                    <Text className="text-[15px]">de ventas</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C]">
                                <FontAwesome name="users" size={20} color="#003F69" />
                                <View className="flex-col">
                                    <Text className="text-[15px]">Agregar </Text>
                                    <Text className="text-[15px]">clientes</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View className="m-5">
                <Text className="font-bold text-[20px] mb-3">Ventas</Text>
                <View className="w-[375px] border rounded-lg border-[#157A8C] h-[337px]">
                    <View className="flex flex-row justify-between m-5">
                        <Text>Articulos más vendidos</Text>
                        <AntDesign name="right" size={24} color="black" />
                    </View>
                </View>
            </View>


        </View>
    )
}