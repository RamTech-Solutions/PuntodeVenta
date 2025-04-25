import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import TextInputs from '../../components/TextInputs'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase-config.js';
import { getAuth } from 'firebase/auth';

export default function EditItem({ navigation, route }) {

  const db = getFirestore(app);
  const auth = getAuth(app);

  const { item } = route.params;

  const itemID = item.id;
  const itemStringID = itemID.toString();

  const [productName, setProductName] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [precioProveedor, setPrecioProveedor] = useState("");
  const [precioCoste, setPrecioCoste] = useState("");
  const [categories, setCategories] = useState("");
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    if (item) {
      setProductName(item.productName || '');
      setPrecioVenta(item.precioVenta || '');
      setPrecioProveedor(item.precioProveedor || '');
      setPrecioCoste(item.precioCoste || '');
      setCategories(item.categories || '');
      setBarcode(item.barcode || '');
    }
  }, [item]);

  const handleDelete = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("Usuario no autenticado");
        return;
      }

      await deleteDoc(doc(db, `usuarios/${userId}/articulos`, item.id));

      // Muestra una alerta para confirmar la eliminación
      Alert.alert("Eliminado", "El producto ha sido eliminado correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Ver Productos') }
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
      const productRef = doc(db, `usuarios/${userId}/articulos`, item.id);

      // Actualizar Firestore con los nuevos valores
      await updateDoc(productRef, {
        productName,
        precioVenta,
        precioProveedor,
        precioCoste,
        categories,
        barcode
      });

      Alert.alert("Actualizado", "El producto ha sido actualizado correctamente.", [
        { text: "OK", onPress: () => navigation.navigate('Ver Productos') }
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
              placeHolder={item.productName}
              value={productName}
              onChangeText={setProductName} />

            <TextInputs
              titulo="Precio de venta"
              placeHolder={item.precioVenta}
              value={precioVenta}
              onChangeText={setPrecioVenta} />

            <View className="bg-white rounded-md p-5 gap-5">
              <TextInputs
                titulo="Precio"
                placeHolder={item.precioProveedor}
                value={precioProveedor}
                onChangeText={setPrecioProveedor}
              />
              <TextInputs
                titulo="Coste"
                placeHolder={item.precioCoste}
                value={precioCoste}
                onChangeText={setPrecioCoste} />
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
                placeHolder={item.categories}
                value={categories}
                onChangeText={setCategories} />
              <TextInputs
                titulo="ID"
                placeHolder={itemStringID} />
              <TextInputs
                titulo="Código de barras"
                placeHolder={item.barcode}
                value={barcode}
                onChangeText={setBarcode} />
            </View>

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity onPress={handleUpdate}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Editar producto</Text>
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
