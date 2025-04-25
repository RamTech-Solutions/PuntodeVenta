import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase-config.js';
import { getAuth } from 'firebase/auth';

export default function EditWorkers({ navigation, route }) {

  const db = getFirestore(app);
  const auth = getAuth(app);

  const { item } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");


  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setEmail(item.email || '');
      setPhoneNumber(item.phoneNumber || '');
      setAddress(item.address || '');
      setRole(item.role || '');
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("Usuario no autenticado");
        return;
      }

      await deleteDoc(doc(db, `usuarios/${userId}/trabajadores`, item.id));

      // Muestra una alerta para confirmar la eliminación
      Alert.alert("Eliminado", "El producto ha sido eliminado correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Ver Trabajadores') }
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

      // Referencia al documento en Firestore
      const workRef = doc(db, `usuarios/${userId}/trabajadores`, item.id);

      // Actualizar Firestore con los nuevos valores
      await updateDoc(workRef, {
        name,
        email,
        phoneNumber,
        address,
        role
      });

      Alert.alert("Actualizado", "El producto ha sido actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Ver Trabajadores') }
      ]);
    } catch (error) {
      console.error("Error actualizando producto: ", error);
      Alert.alert("Error", "Hubo un problema al actualizar el producto.");
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 ">
        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del empleado</Text>
        </View>

        {/* <View className=" justify-center items-center">
          <Image
            source={{ uri: "https://placehold.jp/255x255.png" }}
            className="w-[255px] h-[255px] rounded-full"
          />
        </View> */}

        {/* Formularios */}
        <View className="m-5 ">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre del trabajador"
              placeHolder={item.name}
              value={name}
              onChangeText={setName} />
            <TextInputs
              titulo="Número de telefono"
              placeHolder={item.phoneNumber}
              value={phoneNumber}
              onChangeText={setPhoneNumber} />

            <TextInputs
              titulo="Email"
              placeHolder={item.email}
              value={email}
              onChangeText={setEmail}
            />
            <TextInputs
              titulo="Rol"
              placeHolder={item.role}
              value={role}
              onChangeText={setRole} />
            <TextInputs
              titulo="Dirección"
              placeHolder={item.address}
              value={address}
              onChangeText={setAddress} />

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity onPress={handleUpdate}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Editar trabajador</Text>
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

        </View>
      </View>
    </ScrollView>
  )
}