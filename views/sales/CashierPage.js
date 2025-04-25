import { View, Text, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import '../../global.css'
import { useRoute } from '@react-navigation/native';
import { auth } from '../../firebase-config.js';
import { getFirestore, collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useProductContext } from '../../context/ProductContext';

export default function CashierPage({ navigation }) {
  const route = useRoute();
  const { cartItems, total } = route.params || {}; // Obtiene los productos y el total
  const db = getFirestore();
  const { clearCart } = useProductContext();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [change, setChange] = useState(null);


  const handlePress = (value) => {
    setAmount((prev) => prev + value);
  };

  const handleDelete = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleConfirmPurchase = async () => {
    if (paymentMethod === 'Efectivo') {
      const paidAmount = parseFloat(amount);
      if (isNaN(paidAmount) || paidAmount < total) {
        Alert.alert('Pago insuficiente', 'El monto entregado es menor que el total.');
        return;
      }
      setChange(paidAmount - total);
    }

    try {
      const userId = auth.currentUser.uid;
      await addDoc(collection(db, `usuarios/${userId}/ventas`), {
        productos: cartItems,
        total,
        paymentMethod,
        amountPaid: paymentMethod === 'Efectivo' ? parseFloat(amount) : total,
        change: paymentMethod === 'Efectivo' ? parseFloat(amount) - total : 0,
        timestamp: serverTimestamp(),
      });

      Alert.alert('Compra guardada con éxito');
      navigation.navigate('Payment Successful', { paymentMethod, change: parseFloat(amount) - total });
      clearCart();
    } catch (error) {
      console.error('Error al guardar la venta:', error);
    }
  };

  return (
    <View className="flex-1 mx-5 gap-8">
      {/* Total */}
      <TouchableOpacity onPress={() => navigation.navigate('Venta')}>
        <View className="justify-center items-start mt-5">
          <AntDesign name="left" size={24} color="#003F69" />
        </View>
      </TouchableOpacity>

      <View className="border-t border-b border-[#d1d1d1]">
        <View className="flex flex-row justify-between items-center my-5">
          <Text className="text-lg font-semibold text-[#003F69]">Factura Total</Text>
          <Text className="text-lg font-bold text-[#003F69]">Total: ${total.toFixed(2)}</Text>
        </View>
      </View>

      <View>
        <View className="flex-row justify-around border-gray-300">
          <TouchableOpacity onPress={() => setPaymentMethod('Efectivo')} className="pb-2 items-center w-40">
            <Text className={`text-xl text-center ${paymentMethod === 'Efectivo' ? 'text-black' : 'text-gray-400'}`}>Efectivo</Text>
            <View className={`h-1 mt-1 w-40 ${paymentMethod === 'Efectivo' ? 'bg-[#2A3256]' : 'opacity-0'}`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPaymentMethod('Tarjeta')} className="pb-2 items-center w-40">
            <Text className={`text-xl text-center ${paymentMethod === 'Tarjeta' ? 'text-black' : 'text-gray-400'}`}>Tarjeta</Text>
            <View className={`h-1 mt-1 w-40 ${paymentMethod === 'Tarjeta' ? 'bg-[#2A3256]' : 'opacity-0'}`} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Input price */}
      <View className="p-5 rounded-2xl w-full ">
        {paymentMethod === 'Efectivo' && (
          <>
            <View className="items-center">
              <View className="border border-[#157A8C] rounded-lg  w-full p-10 mb-5">
                <Text className="text-xl text-[#2A3256] text-start mb-5">Total de dinero entregado:</Text>
                <Text className="text-xl text-[#2A3256] font-bold text-start mb-5">${amount}</Text>
              </View>
              <View className="flex flex-wrap flex-row justify-center gap-4 w-80">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <TouchableOpacity
                    key={num}
                    onPress={() => handlePress(num.toString())}
                    className="bg-white p-4 rounded-xl justify-center items-center w-20 shadow-sm"
                  >
                    <Text className="text-[#2A3256] text-2xl">{num}</Text>
                  </TouchableOpacity>
                ))}
                <View className="w-20" />
                <TouchableOpacity
                  onPress={() => handlePress('0')}
                  className="bg-white p-4 rounded-xl justify-center items-center w-20 shadow-sm"
                >
                  <Text className="text-[#2A3256] text-2xl">0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} className="bg-transparent p-4 rounded-xl justify-center items-center w-20">
                  <Text className="text-[#2A3256] text-2xl">⌫</Text>
                </TouchableOpacity>
              </View>
            </View>


          </>
        )}
        {paymentMethod === 'Tarjeta' && (
          <View>
            <Text className="text-xl mb-5 font-bold">E-Wallet</Text>
            <View className="flex flex-row gap-4 items-center justify-center">
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/google-pay.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/Alfa-Bank.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/apple-pay.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-xl mb-5 font-bold ">Débito</Text>
            <View className="flex flex-row gap-4 items-center justify-center">
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/Visa.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/master-card.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
              <TouchableOpacity className="border border-[#157A8C] p-4 rounded-xl mb-3">
                <Image
                  source={require('../../assets/payment/american-express.png')}
                  className="w-[80px] h-[80px]"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity onPress={handleConfirmPurchase} className="bg-[#2A3256] mt-10 p-4 rounded-xl">
          <Text className="text-white text-center text-xl font-bold">Confirmar Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}