import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import OptionComponent from '../../components/OptionComponent';
import '../../global.css'
import { auth } from '../../firebase-config.js'

export default function MainConfiguration(navigation) {

     const user = auth.currentUser;

    return (
        <View className="flex-1 justify-between" >
            {/* Header Cuenta */}
            <View>
                <View className="m-5">
                    <Text className="text-[#003F69] font-bold text-2xl">
                        Cuenta
                    </Text>
                </View>
                <View className=" items-center">
                    <View className="bg-white w-[380px] flex flex-row justify-between items-center p-14 border border-[#003F69] rounded-lg">
                        <View className="flex-col">
                            <Text className="text-2xl font-bold ">
                                Usuario
                            </Text>
                            <Text>
                                {user.email}
                            </Text>
                        </View>
                        <View>
                            <FontAwesome name="user" size={50} color="#003F69" />
                        </View>

                    </View>
                </View>
            </View>

            {/* Body Acciones rapidas */}
            <View>
                <View className="ml-5">
                    <Text className="text-[#003F69] font-bold text-2xl">
                        Acciones rápidas
                    </Text>
                </View>
                <View className="m-5 gap-7">
                    <OptionComponent
                        option="Cambiar contraseña" 
                        link="Cambiar Contraseña"/>
                    <OptionComponent
                        option="Productos e Inventario"
                        link="Ver Productos" />
                    <OptionComponent
                        option="Personalizar app" 
                        link="Personalizar App"/>
                    <OptionComponent
                        option="Historial de ventas"
                        link="Notificaciones" />
                </View>
            </View>

            {/* Footer Ayuda y soporte*/}
            <View className="mb-5">
                <View className="ml-5">
                    <Text className="text-[#003F69] font-bold text-2xl">
                        Ayuda y soporte
                    </Text>
                </View>

                <View className="m-5 gap-7 ">
                    <OptionComponent
                        option="Acerca de nosotros"
                        link="Acerca de nosotros" />
                    <OptionComponent
                        option="Ayuda & FAQs"
                        link="Ayuda & FAQs" />
                    <OptionComponent
                        option="Contactanos"
                        link="Contactanos" />
                </View>
            </View>



        </View>
    )
}