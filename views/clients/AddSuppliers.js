import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextInputs from '../../components/TextInputs'
import { db } from '../../firebase-config.js';
import { doc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AntDesign from '@expo/vector-icons/AntDesign';

import '../../global.css'
import { ScrollView } from 'react-native-gesture-handler';


export default function AddSuppliers({ navigation }) {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [numero, setNumero] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleAddSupplier = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            Alert.alert("Error", "No hay usuario autenticado.");
            return;
        }

        try {
            // Se obtiene la referencia del documento del usuario
            const userDocRef = doc(db, "usuarios", user.uid);
            // Se obtiene la subcolección 'trabajadores'
            const proveedoresRef = collection(userDocRef, "proveedores");

            await addDoc(proveedoresRef, {
                nombre,
                numero,
                email,
                categoria
            });

            Alert.alert("Proveedor agregado correctamente");

            // Se limpian los campos del formulario
            setNombre("");
            setNumero("");
            setEmail("");
            setCategoria("");

        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (

        <ScrollView>

            <View className="flex-1 justify-between gap-5">
                <View className="mx-5 mt-5">
                    <TouchableOpacity onPress={() => navigation.navigate('Ver proveedores')}>
                        <AntDesign name="left" size={24} color="#003F69" />
                    </TouchableOpacity>
                </View>


                <View className="mx-5 gap-5">
                    <Text className="text-[#003F69] font-bold text-[20px]">Detalles del proveedor</Text>
                    <TextInputs
                        titulo="Nombre del proveedor"
                        placeHolder="Nombre ejemplo"
                        value={nombre}
                        onChangeText={setNombre} />

                    <TextInputs
                        titulo="Número de telefono"
                        placeHolder="+52 (xxx)-xxx-xxxx"
                        value={numero}
                        onChangeText={setNumero} />

                    <TextInputs
                        titulo="Email"
                        placeHolder="ejemplo@gmail.com"
                        value={email}
                        onChangeText={setEmail} />

                    <TextInputs
                        titulo="Categoría"
                        placeHolder="Snacks"
                        value={categoria}
                        onChangeText={setCategoria} />


                    <View className="justify-center items-center gap-5">
                        <TouchableOpacity onPress={handleAddSupplier}>
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

                </View>
            </View>

        </ScrollView>



    )
}