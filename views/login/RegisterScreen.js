import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config.js';

export default function RegisterScreen({ navigation }) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // const handleCreateAccount = () => {
  //   if (password !== confirmPassword) {
  //     Alert.alert("Error", "Las contraseñas no coinciden");
  //     return;
  //   }

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       Alert.alert("Cuenta creada con éxito");
  //       console.log('Registro exitoso');
  //       navigation.navigate('Login');

  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       Alert.alert(error.message);
  //     });
  // }

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    //sirve, falta la validación de email
    // nota 2: por alguna razón se redirecciona dos veces, toca investigar
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // **Agregar usuario a Firestore**
      await setDoc(doc(db, "usuarios", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      // **Crear subcolecciones**
      const proveedoresRef = collection(db, "usuarios", user.uid, "proveedores");
      const articulosRef = collection(db, "usuarios", user.uid, "articulos");
      const trabajadoresRef = collection(db, "usuarios", user.uid, "trabajadores");


      setTimeout(() => {
        if (auth.currentUser) {
          Alert.alert("Cuenta creada con éxito");
          navigation.replace('Dashboard')
        }

      }, 100);



    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-around bg-white">
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View className="m-3">
          <AntDesign name="left" size={24} color="#003F69" />
        </View>
      </TouchableOpacity>


      {/* Header */}
      <View className="justify-center items-center">
        <Text className="text-[#003f69] text-3xl text-center font-semibold w-[200px]">Crea una cuenta</Text>
      </View>

      {/* Body */}
      <View className="">
        <View className="m-5 gap-5">
          <Text>Correo</Text>
          <TextInput className="w-[369px] h-[50px] items-start justify-center border border-[#003f69]  rounded-md p-5" placeholder='user@gmail.com' onChangeText={(text) => setEmail(text)}></TextInput>
        </View>

        <View className="m-5 gap-5">
          <Text>Crea una contraseña</Text>
          <View className="w-[369px] h-[50px] border border-[#003f69] rounded-md flex flex-row items-center justify-between">
            <TextInput className="p-5 w-[300px]" placeholder='Contraseña' secureTextEntry={true} onChangeText={(text) => setPassword(text)} ></TextInput>
            <AntDesign className="mr-5" name="eye" size={22} color="#003f69" />
          </View>
        </View>

        <View className="m-5 gap-5">
          <Text>Confirma tu contraseña</Text>
          <View className="w-[369px] h-[50px] border border-[#003f69]  rounded-md  flex flex-row items-center justify-between">
            <TextInput className="p-5 w-[300px]" placeholder='Contraseña' secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)}></TextInput>
            <AntDesign className="mr-5" name="eye" size={22} color="#003f69" />
          </View>
        </View>

        <View className="justify-center items-center">
          <TouchableOpacity onPress={handleCreateAccount}>
            <View className="justify-center items-center bg-[#003F69] w-[359px] h-[50px] rounded-lg">
              <Text className="font-bold text-white">Registrate</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-[#B3ACA4] m-5">¿Ya tienes una cuenta? Inicia sesión! </Text>
        </TouchableOpacity>

      </View>

      {/* Footer */}
      <View className="justify-center items-center gap-5">
        <Text>Continuar con</Text>
        <TouchableOpacity>
          <View className=" rounded-full border p-5 w-[60px] h-[60px]">
            <AntDesign name="google" size={24} color="black" />
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>

  )
}