import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'

export default function EditWorkers({ navigation, route }) {

  const { item, deleteItem } = route.params;
  const itemID = item.id;
  const itemStringID = itemID.toString();

  const handleDelete = () => {
    deleteItem(item.id); // Elimina el producto
    navigation.navigate('Ver Trabajadores'); // Regresa a la vista de productos
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
              titulo="Nombre del producto"
              placeHolder={item.name} />
            <TextInputs
              titulo="Número de telefono"
              placeHolder="xxx-xxx-xxxx" />

            <TextInputs
              titulo="Email"
              placeHolder={"email@example.com"}
            />
            <TextInputs
              titulo="Rol"
              placeHolder={item.category} />
            <TextInputs
            titulo="Dirección"
            placeHolder="Galileo 305, Fátima, 34060 Durango, Dgo."/>

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