import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import '../global.css'
import Feather from '@expo/vector-icons/Feather';
import { useProductContext } from '../context/ProductContext';

const ItemSale = ({ product }) => {
    const { updateProductQuantity, removeProductFromCart } = useProductContext();

    return (
        <View className="border border-[#157A8C] rounded-lg w-52 ">
            <View className="">
                <View className="justify-end items-end m-1">
                    <TouchableOpacity onPress={() => removeProductFromCart(product.id)}>
                        <View className="bg-[#d9e2e9] p-2 rounded-full items-center justify-center  ">
                            <Feather name="x" size={20} color="#003F69" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="justify-center items-center ">
                    <Image
                        source={{ uri: 'https://placehold.jp/110x110.png' }}
                        className="w-[110px] h-[110px]"
                    />
                </View>


            </View>

            <View className="gap-5 mx-5">
                <Text className="font-bold text-[#003F69]">{product.name}</Text>
                <Text className="text-[#003F69] mb-2">${product.price}</Text>
                <Text className="text-[#003F69] mb-2">Cantidad: {product.quantity}</Text>
            </View>
            {/* Controles de Cantidad */}
            <View className="flex-row items-center justify-center mb-5">

                <TouchableOpacity
                    onPress={() => {
                        if (product.quantity > 1) {
                            updateProductQuantity(product.id, product.quantity - 1); // Disminuir solo si > 1
                        }
                    }}
                    className="bg-[#003F69] p-2 rounded-full mx-2"
                >
                    <Feather name="minus" size={20} color="white" />
                </TouchableOpacity>

                {/* Botón para aumentar cantidad */}
                <TouchableOpacity
                    onPress={() => updateProductQuantity(product.id, product.quantity + 1)}
                    className="bg-[#003F69] p-2 rounded-full mx-2"
                >
                    <Feather name="plus" size={20} color="white" />
                </TouchableOpacity>


            </View>
        </View>
    )
}

export default ItemSale