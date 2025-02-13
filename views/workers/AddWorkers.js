import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import '../../global.css'

export default function AddWorkers({ navigation }) {
  return (
    <ScrollView>
      <View className="flex-1 ">
        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del trabajador</Text>
        </View>

        {/* Formularios */}
        <View className="m-5 ">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre"
              placeHolder="John Doe" />
            <TextInputs
              titulo="Número de telefono"
              placeHolder="xxx-xxx-xxxx" />

            <TextInputs
              titulo="Email"
              placeHolder="email@example.com" />

            <TextInputs
              titulo="Rol dentro del local"
              placeHolder="Ejemplo de rol" />

            <TextInputs
              titulo="Información de domicilio"
              placeHolder="Los Truenos 501-507, Fundo Legal el Saltito, 34105 Durango, Dgo." />

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Añadir trabajador</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="w-full">
                <TouchableOpacity>
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