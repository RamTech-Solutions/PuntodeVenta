import { View, Text, TouchableOpacity } from 'react-native'
import '../../global.css'
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { auth } from '../../firebase-config.js'
import { useProductContext } from '../../context/ProductContext.js';
import { useEffect } from "react";


export default function DashboardMain({ navigation }) {

    const { salesHistory, fetchSalesHistory } = useProductContext();


    useEffect(() => {
        const unsubscribe = fetchSalesHistory();
        return () => unsubscribe && unsubscribe(); // Limpia la suscripción
    }, []);



    return (
        <View className="flex-1 justify-between bg-white">

            <View className="m-5">
                <Text className="font-bold text-[20px] text-[#003F69]">Acciones Rapidas</Text>

                <View className="mt-10">
                    <View className="flex-row justify-evenly mb-10">
                        <TouchableOpacity onPress={() => navigation.navigate('Añadir Productos')}>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C] bg-white">
                                <Fontisto name="shopping-basket-add" size={20} color="#003F69" />
                                <View className="flex-col">
                                    <Text className="text-[15px]">Agregar</Text>
                                    <Text className="text-[15px]">articulo</Text>
                                </View>

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Añadir Trabajador')}>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C] bg-white">
                                <Ionicons name="person-add" size={20} color="#003F69" />
                                <View className="flex-col">
                                    <Text className="text-[15px]">Agregar </Text>
                                    <Text className="text-[15px]">empleado</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View className="flex-row justify-evenly">
                        <TouchableOpacity onPress={() => navigation.navigate('Informe de ventas')}>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C] bg-white">
                                <AntDesign name="barschart" size={20} color="#003F69" />

                                <View className="flex-col">
                                    <Text className="text-[15px]">Resumen </Text>
                                    <Text className="text-[15px]">de ventas</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className=" flex flex-row justify-center items-center gap-5 h-[129px] w-[175px] rounded-lg border border-[#157A8C] bg-white">
                                <FontAwesome name="users" size={20} color="#003F69" />
                                <View className="flex-col ">
                                    <Text className="text-[15px] text-center">Agregar </Text>
                                    <Text className="text-[15px] text-center">proveedores</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>

            <View className="m-5">
                <Text className="font-bold text-[20px] mb-3 text-[#003F69]">Ventas</Text>
                <View className="w-[375px] border rounded-lg border-[#157A8C] h-[337px] bg-white">
                    <View className="flex flex-row justify-between m-5">
                        <Text className="font-bold text-[#003F69] text-lg">Historial</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Historial de ventas')}>
                            <AntDesign name="right" size={24} color="#003F69" />
                        </TouchableOpacity>
                        
                    </View>

                    {salesHistory.length === 0 ? (
                        <Text className="text-center text-gray-500">No hay ventas recientes</Text>
                    ) : (
                        salesHistory.map((sale, index) => (
                            <View key={index} className="p-5 ">
                                <Text className="font-bold text-[#003F69] border-b border-[#003f69]">Ticket {index + 1}</Text>
                                <Text>Fecha:  {sale.timestamp ? new Date(sale.timestamp.seconds * 1000).toLocaleDateString() : "Fecha no disponible"}</Text>
                                <Text>Total: ${sale.total}</Text>
                            </View>
                        ))
                    )}
                </View>
            </View>


        </View>
    )
}