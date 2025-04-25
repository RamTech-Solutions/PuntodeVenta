import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import { db } from '../../firebase-config.js';
import { doc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import '../../global.css'
import AntDesign from '@expo/vector-icons/AntDesign';


export default function AddWorkers({ navigation }) {

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');

  const handleAddWorker = async () => {
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
      const trabajadoresRef = collection(userDocRef, "trabajadores");

      await addDoc(trabajadoresRef, {
        name,
        phoneNumber,
        email,
        address,
        role
      });

      Alert.alert("Trabajador agregado correctamente");
      // Se limpian los campos del formulario
      setName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
      setRole("");

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 ">

        <View className="mx-5 mt-5">
          <TouchableOpacity onPress={() => navigation.navigate('Ver Trabajadores')}>
            <AntDesign name="left" size={24} color="#003F69" />
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del trabajador</Text>
        </View>

        {/* Formularios */}
        <View className="m-5 ">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre"
              placeHolder="John Doe"
              value={name}
              onChangeText={setName} />
            <TextInputs
              titulo="Número de telefono"
              placeHolder="xxx-xxx-xxxx"
              value={phoneNumber}
              onChangeText={setPhoneNumber} />

            <TextInputs
              titulo="Email"
              placeHolder="email@example.com"
              value={email}
              onChangeText={setEmail} />

            <TextInputs
              titulo="Rol dentro del local"
              placeHolder="Ejemplo de rol"
              value={role}
              onChangeText={setRole} />

            <TextInputs
              titulo="Información de domicilio"
              placeHolder="Los Truenos 501-507, Fundo Legal el Saltito, 34105 Durango, Dgo."
              value={address}
              onChangeText={setAddress} />

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity onPress={handleAddWorker}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Añadir trabajador</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="w-full">
                <TouchableOpacity onPress={() => navigation.navigate('Ver Trabajadores')}>
                  <View className="border border-red-600 p-5 rounded-lg items-center bg-white">
                    <Text className="text-red-600 font-bold">Cancelar</Text>
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