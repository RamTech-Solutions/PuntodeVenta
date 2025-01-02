import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'

export default function EditItem({ navigation, route }) {

  const { item, deleteItem } = route.params;

  const itemID = item.id;
  const itemStringID= itemID.toString();

  const handleDelete = () => {
    deleteItem(item.id); // Elimina el producto
    navigation.navigate('Ver Productos'); // Regresa a la vista de productos
};
  
 
  return (
    <ScrollView>
      <View className="flex-1 ">
        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del producto</Text>
        </View>

        <View className=" justify-center items-center">
          <Image
            source={{ uri: "https://placehold.jp/255x255.png" }}
            className="w-[255px] h-[255px] rounded-full"
          />
        </View>

        {/* Formularios */}
        <View className="m-5 ">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre del producto"
              placeHolder={item.name} />
            <TextInputs
              titulo="Precio de venta"
              placeHolder={item.price} />

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
                placeHolder={item.category} />
              <TextInputs
                titulo="ID"
                placeHolder= {itemStringID} />
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

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover', // Ajusta cómo se muestra la imagen
  }
});