import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config.js';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import '../../global.css'

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);


    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Inicio de sesión éxitoso')
                
                setTimeout(() => {
                    if (auth.currentUser) {
                        navigation.replace('Dashboard')
                    }

                }, 100);


            })
            .catch((error) => {
                console.log(error)
                Alert.alert(error.message)
            })
    }


    return (
        <SafeAreaView className="flex-1 justify-around bg-white">
            {/* Header */}
            <View className="justify-center items-center">
                <Text className="text-[#003f69] text-3xl text-center font-semibold w-[200px]">Inicia sesión con tu cuenta</Text>
            </View>

            <View className="justify-center items-center">
            <MaterialIcons name="account-circle" size={200} color="#003f69" />
            </View>

            {/* Body */}
            <View className="">
                <View className="m-5 gap-5">
                    <Text>Correo</Text>
                    <TextInput className="w-[369px] h-[60px] items-start justify-center border border-[#003f69]  rounded-md p-5" placeholder='user@gmail.com' onChangeText={(text) => setEmail(text)}></TextInput>
                </View>

                <View className="m-5 gap-5">
                    <Text>Contraseña</Text>
                    <View className="w-[369px] h-[60px] border border-[#003f69]  rounded-md  flex flex-row items-center  justify-between">
                        <TextInput className="p-5 w-[300px]" placeholder='Contraseña' secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Forgot password')}>
                        <Text className="text-gray-500">¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </View>


                <View className="justify-center items-center">
                    <TouchableOpacity onPress={handleSignIn}>
                        <View className="justify-center items-center bg-[#003F69] w-[359px] h-[50px] rounded-lg">
                            <Text className="font-bold text-white">Iniciar Sesión</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-gray-500 m-5">¿No tienes cuenta? Registrate</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>

    )
}