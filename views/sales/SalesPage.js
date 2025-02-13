import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '../../global.css'
import ItemSale from '../../components/ItemSale'
import AddProduct from '../../components/AddProduct'

export default function SalesPage( { navigation }) {
  return (
    <View className="flex-1 justify-between">

      <View className="flex flex-col">
        <View className="m-5">
          <Text className="font-bold text-[#003F69] text-2xl">Venta</Text>
        </View>
        <View className="flex flex-row justify-center items-center gap-5">
          <ItemSale/>
          <ItemSale/>
        </View>
        <View className="ml-5 mt-5">
        <AddProduct/>
        </View>
      </View>

      {/* Footer */}
      <View className="items-center justify-center mb-6">
        <TouchableOpacity onPress={()=> navigation.navigate('Cajero')}>
          <View className="bg-[#2A3256] p-5 rounded-lg w-96 items-center">
            <Text className="font-bold text-white">Proceder a la compra</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

  )
}