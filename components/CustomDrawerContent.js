import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import '../global.css'

export default function CustomDrawerContent(props) {
    return (
        <View className="flex-1">
            {/* Contenido desplazable */}
            <DrawerContentScrollView {...props} className="flex-1">
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Botón fijo al fondo */}
            <TouchableOpacity className="p-5 bg-[#003F69] rounded-md mx-5 mb-5">
                <Text className="text-white text-center font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>

    );
}
