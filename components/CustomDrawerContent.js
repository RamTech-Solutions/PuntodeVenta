import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import '../global.css'
import { getAuth, signOut } from 'firebase/auth';
import AuthContext from '../context/AuthContext';



export default function CustomDrawerContent(props) {

const { setUser } = useContext(AuthContext);
const auth = getAuth();


    const handleLogout = async () => {
        try {
          await signOut(auth);
          setUser(null); // Asegura que el usuario se borre del contexto
          console.log("Sesión cerrada exitosamente");
        } catch (error) {
          console.error("Error al cerrar sesión:", error);
        }
      };

    return (
        
            <View className="flex-1">
            {/* Contenido desplazable */}
            <DrawerContentScrollView {...props} className="flex-1">
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            {/* Botón fijo al fondo */}
            <TouchableOpacity onPress={handleLogout} className="p-5 bg-[#003F69] rounded-md mx-5 mb-5">
                <Text className="text-white text-center font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>

       
    );
}
