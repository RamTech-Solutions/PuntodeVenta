import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import '../../global.css'

export default function AddItem({ navigation }) {
  return (
    <ScrollView>
      <View className="flex-1 ">
        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del producto</Text>
        </View>

        {/* Formularios */}
        <View className="m-5 ">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre del producto"
              placeHolder="Ejemplo de nombre" />
            <TextInputs
              titulo="Precio de venta"
              placeHolder="$99.99" />

            <View className="bg-white rounded-md p-5 gap-5">
              <TextInputs
                titulo="Precio"
                placeHolder="$99.99"
              />
              <TextInputs
                titulo="Coste"
                placeHolder="$99.99" />
            </View>

            <View className="flex flex-col gap-5">
              <Text className="text-[#003F69] text-[22px] font-bold ">Añadir foto (opcional)</Text>
              <View className="flex flex-row items-center justify-between border border-[#157A8C] bg-white p-5 rounded-md">
                <Image
                  source={{ uri: "https://placehold.jp/80x80.png" }}
                  className="w-[80px] h-[80px]"
                />
                <TouchableOpacity>
                  <View className="bg-[#003F69] p-5 rounded-md w-40 justify-center items-center">
                    <Text className="text-white font-bold">Subir</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="gap-5">
              <TextInputs
                titulo="Categoría"
                placeHolder="$99.99" />
              <TextInputs
                titulo="ID"
                placeHolder="P342" />
              <TextInputs
                titulo="Código de barras"
                placeHolder="P342" />
            </View>

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Añadir nuevo producto</Text>
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

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover', // Ajusta cómo se muestra la imagen
  }
});
