import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputs from '../../components/TextInputs';
import '../../global.css';
import { db, storage } from '../../firebase-config.js'; // Asegúrate de importar storage
import { doc, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddItem({ navigation, route }) {

  // Información del producto
  const [categories, setCategory] = useState('');
  const [barcode, setBarcode] = useState('');
  const [precioCoste, setPrecioCoste] = useState('');
  const [productName, setProductName] = useState('');
  const [precioProveedor, setPrecioProveedor] = useState('');
  const [precioVenta, setPrecioVenta] = useState('');
  const [stock, setStock] = useState('');
  const [url, setUrl] = useState('');

  const handleAddArticulo = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No hay usuario autenticado.");
      return;
    }

    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const articulosRef = collection(userDocRef, "articulos");

      await addDoc(articulosRef, {
        productName,
        categories,
        barcode,
        precioCoste,
        precioProveedor,
        precioVenta,
        stock,
        imageUrl: url, // Guarda la URL de la imagen en Firestore
      });

      Alert.alert("Artículo agregado correctamente");
      navigation.navigate('Ver Productos');

      // Limpiar los campos
      setCategory("");
      setBarcode("");
      setPrecioCoste("");
      setProductName("");
      setPrecioProveedor("");
      setPrecioVenta("");
      setStock("");
      setUrl("");

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // Función para seleccionar y subir imagen
  const pickAndUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/${Date.now()}`);
      await uploadBytes(storageRef, blob);
      const imageUrl = await getDownloadURL(storageRef);

      setUrl(imageUrl); // Actualizar la URL de la imagen en el estado
    }
  };

  // Código de barras: extrae datos de `route.params`
  useEffect(() => {
    if (route.params) {
      const { barcode, productName, categories, url } = route.params;
      setBarcode(barcode || '');
      setProductName(productName || '');
      setCategory(categories || '');
      setUrl(url || '');
    }
  }, [route.params]);

  return (
    <ScrollView>
      <View className="flex-1">
        <View className="mx-5 mt-5">
          <TouchableOpacity onPress={() => navigation.navigate('Ver Productos')}>
            <AntDesign name="left" size={24} color="#003F69" />
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-[#003F69] font-bold m-5 text-[22px]">Detalles del producto</Text>
        </View>

        {/* Formularios */}
        <View className="m-5">
          <View className="gap-5">
            <TextInputs
              titulo="Nombre del producto"
              placeHolder="Ejemplo: Manzana"
              value={productName}
              onChangeText={setProductName}
            />

            <TextInputs
              titulo="Precio de venta"
              placeHolder="$99.99"
              value={precioVenta}
              onChangeText={setPrecioVenta}
              keyboardType="numeric"
            />

            <View className="bg-white rounded-md p-5 gap-5">
              <TextInputs
                titulo="Precio proveedor"
                placeHolder="$99.99"
                value={precioProveedor}
                onChangeText={setPrecioProveedor}
                keyboardType="numeric"
              />
              <TextInputs
                titulo="Coste"
                placeHolder="$99.99"
                value={precioCoste}
                onChangeText={setPrecioCoste}
                keyboardType="numeric"
              />
            </View>

            <View className="flex flex-col gap-5">
              <Text className="text-[#003F69] text-[22px] font-bold">Añadir foto (opcional)</Text>
              <View className="flex flex-row items-center justify-between border border-[#157A8C] bg-white p-5 rounded-md">
                <Image
                  source={{ uri: url || "https://placehold.jp/80x80.png" }}
                  className="w-[80px] h-[80px] rounded"
                />
                <TouchableOpacity onPress={pickAndUploadImage}>
                  <View className="bg-[#003F69] p-5 rounded-md w-40 justify-center items-center">
                    <Text className="text-white font-bold">Subir</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="gap-5">
              <TextInputs
                titulo="Categoría"
                placeHolder="Ejemplo: Frutas"
                value={categories}
                onChangeText={setCategory}
              />
              <TextInputs
                titulo="Código de barras"
                placeHolder="Ejemplo: 123456789"
                value={barcode}
                onChangeText={setBarcode}
              />
              <TextInputs
                titulo="Stock"
                placeHolder="Ejemplo: 50"
                value={stock}
                onChangeText={setStock}
                keyboardType="numeric"
              />
            </View>

            {/* Botón de aceptar/cancelar */}
            <View className="justify-center items-center gap-5">
              <View className="w-full">
                <TouchableOpacity onPress={() => navigation.navigate("Escanear Productos", { mode: 'addItem' })}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Escanear código de barras</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full">
                <TouchableOpacity onPress={handleAddArticulo}>
                  <View className="bg-[#003F69] p-5 rounded-lg w-full items-center">
                    <Text className="text-white font-bold">Añadir nuevo producto</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full">
                <TouchableOpacity onPress={() => navigation.navigate('Ver Productos')}>
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
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
  }
});
