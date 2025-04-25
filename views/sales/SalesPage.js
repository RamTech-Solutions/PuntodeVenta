import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import '../../global.css';
import ItemSale from '../../components/ItemSale';
import AddProduct from '../../components/AddProduct';
import { useProductContext } from '../../context/ProductContext';

export default function SalesPage({ navigation }) {
  const { cartItems, getTotalPrice } = useProductContext();

  // Datos para el FlatList, puedes agregar el footer y los otros elementos aquí.
  const data = [
    { type: 'header', title: 'Venta' },
    { type: 'products', items: cartItems },
    { type: 'addProduct' },
    { type: 'footer' }
  ];

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'header':
        return (
          <View className="m-5">
            <Text className="font-bold text-[#003F69] text-2xl">{item.title}</Text>
          </View>
        );
      case 'products':
        return (
          <FlatList
            data={item.items}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <ItemSale product={item} />
              </View>
            )}
          />
        );
      case 'addProduct':
        return (
          <View className="ml-5 mt-5 mb-5">
            <AddProduct />
          </View>
        );
      case 'footer':
        return (
          <View className="items-center justify-center mb-6">
            <View className="items-center my-5">
              <Text className="font-bold text-lg text-[#003F69]">
                Total: ${getTotalPrice().toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Cajero', { cartItems, total: getTotalPrice() })}>
              <View className="bg-[#2A3256] p-5 rounded-lg w-96 items-center">
                <Text className="font-bold text-white">Proceder a la compra</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
}
