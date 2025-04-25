import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase-config.js';
import { getAuth } from 'firebase/auth';

export default function EditSuppliers({ navigation, route }) {

    const db = getFirestore(app);
    const auth = getAuth(app);
    const { item } = route.params;

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        if (item) {
            setNombre(item.nombre || '');
            setEmail(item.email || '');
            setNumero(item.numero || '');
            setCategoria(item.categoria || '');
    
        }
    }, [item]);

    const handleDelete = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                console.error("Usuario no autenticado");
                return;
            }

            await deleteDoc(doc(db, `usuarios/${userId}/proveedores`, item.id));

            // Muestra una alerta para confirmar la eliminación
            Alert.alert("Eliminado", "El proveedor ha sido eliminado correctamente.", [
                { text: "OK", onPress: () => navigation.navigate('Ver proveedores') }
            ]);

        } catch (error) {
            console.error("Error eliminando producto: ", error);
            Alert.alert("Error", "Hubo un problema al eliminar el producto.");
        }
    };

    const handleUpdate = async () => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                console.error("Usuario no autenticado");
                return;
            }


            const suppRef = doc(db, `usuarios/${userId}/proveedores`, item.id);


            await updateDoc(suppRef, {
                nombre,
                email,
                numero,
                categoria
            });

            Alert.alert("Actualizado", "El producto ha sido actualizado correctamente.", [
                { text: "OK", onPress: () => navigation.navigate('Ver proveedores') }
            ]);

        } catch (error) {
            console.error("Error actualizando producto: ", error);
            Alert.alert("Error", "Hubo un problema al actualizar el producto.");
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="mx-5 gap-5">
                <Text className="text-[#003F69] font-bold text-[20px]">Editar información del proveedor</Text>
                <TextInputs
                    titulo="Nombre del proveedor"
                    placeHolder={item.nombre}
                    value={nombre}
                    onChangeText={setNombre} />

                <TextInputs
                    titulo="Número de telefono"
                    placeHolder={item.numero}
                    value={numero}
                    onChangeText={setNumero} />

                <TextInputs
                    titulo="Email"
                    placeHolder={item.email}
                    value={email}
                    onChangeText={setEmail} />
                <TextInputs
                    titulo="Categoría"
                    placeHolder={item.categoria}
                    value={categoria}
                    onChangeText={setCategoria} />

                <View className="justify-center items-center gap-5">
                    <View className="w-full">
                        <TouchableOpacity onPress={handleUpdate}>
                            <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                                <Text className="text-white font-bold">Editar proveedor</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View className="w-full">
                        <TouchableOpacity onPress={handleDelete}>
                            <View className=" flex flex-row gap-2 justify-center border border-red-600 p-5 rounded-lg items-center bg-white">
                                <AntDesign name="delete" size={20} color="red" />
                                <Text className="text-red-600 font-bold">Borrar articulo </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>

        </SafeAreaView>
    )
}