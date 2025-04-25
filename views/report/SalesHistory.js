import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useProductContext } from '../../context/ProductContext'
import { ScrollView } from 'react-native-gesture-handler';

export default function SalesHistory() {
    const { wholeSales, fetchAllSales } = useProductContext();

    useEffect(() => {
        const unsubscribe = fetchAllSales();
        return () => unsubscribe && unsubscribe();
    }, []);

    return (
        <ScrollView className="flex-1 p-5 bg-white">
            <Text className="text-[20px] text-[#003F69] font-bold mb-3">Historial de Ventas</Text>

            {wholeSales.length === 0 ? (
                <Text className="text-center text-gray-500">No hay ventas registradas</Text>
            ) : (
                wholeSales.map((sale, index) => (
                    <View key={sale.id} className="p-4 border-2 border-[#003F69] rounded-lg my-3">
                        <Text className="font-bold">Ticket {index + 1}</Text>
                        <Text>Fecha de venta:  {sale.timestamp ? new Date(sale.timestamp.seconds * 1000).toLocaleDateString() : "Fecha no disponible"}</Text>
                        <Text>Total: ${sale.total}</Text>
                        <Text>Tipo de pago: {sale.paymentMethod}</Text>

                        <Text className="font-bold mt-2">Productos:</Text>
                        {sale.productos.length === 0 ? (
                            <Text className="text-gray-500">No hay productos registrados</Text>
                        ) : (
                            sale.productos.map((producto, idx) => (
                                <View key={producto.id} className="flex-row items-center space-x-3 p-2 border border-[#003F69] rounded-lg my-1 ">
                                    {producto.image ? (
                                        <Image
                                            source={{ uri: producto.image }}
                                            className="w-14 h-14 rounded m-5 "
                                        />
                                    ) : null}
                                    <View>
                                        <Text className="font-semibold">{producto.name}</Text>
                                        <Text>Cantidad: {producto.quantity}</Text>
                                        <Text>Precio: ${producto.price}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>
                ))
            )}
        </ScrollView>
    )
}