import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import '../../global.css'

export default function AddItem({ navigation, route }) {

  const [productName, setProductName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [categories, setCategory] = useState('');
  const [url, setUrl] = useState('')

  // código de barras
  useEffect(() => {
    if (route.params) {
      const { barcode, productName, categories, url } = route.params;
      setBarcode(barcode);
      setProductName(productName);
      setCategory(categories);
      setUrl(url)

      console.log(productName)
      console.log(barcode)
      console.log(categories)
      console.log(url)
    }
  }, [route.params]);


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
              titulo={"Nombre del producto"}
              placeHolder={productName} />

            <TextInputs
              titulo="Precio de venta"
              placeHolder="$99.99"
            />

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
                  source={{
                    uri: url && url.trim() !== ""
                      ? url
                      : "https://placehold.jp/80x80.png"
                  }}
                  className="w-[80px] h-[80px] rounded"
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
                placeHolder={categories} />
              <TextInputs
                titulo="ID"
                placeHolder={barcode} />
              <TextInputs
                titulo="Código de barras"
                placeHolder={barcode} />
            </View>

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">

              <View className="w-full">
                <TouchableOpacity onPress={() => navigation.navigate("Escanear Productos", { mode: 'addItem' })}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Escanear código de barras (Auto-completar)</Text>
                  </View>
                </TouchableOpacity>
              </View>

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
