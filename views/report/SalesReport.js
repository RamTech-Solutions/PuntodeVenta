import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import '../../global.css'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { LineChart } from "react-native-chart-kit";
import { Provider as PaperProvider } from 'react-native-paper';
import SalesComponent from '../../components/DataTable';
import PopUp from '../../components/PopUp';
import { db } from '../../firebase-config.js'
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const data = [
  { label: 'Ventas de artículos', value: '1' },
  { label: 'Empleados', value: '2' },
  { label: 'Venta por categoría', value: '3' },
];

export default function SalesReport() {
  const [value, setValue] = useState(null);
  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          console.error("No hay usuario autenticado");
          return;
        }
        const userId = user.uid;
  
        const salesRef = collection(db, `usuarios/${userId}/ventas`);
        const q = query(salesRef, orderBy('timestamp', 'asc'));
        const querySnapshot = await getDocs(q);
  
        const sales = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            date: data.timestamp ? data.timestamp.toDate().toLocaleDateString() : "Fecha no disponible",
            amount: typeof data.total === "number" && isFinite(data.total) ? data.total : 0, // Ensure valid number
          };
        });
  
        const groupedSales = {};
        sales.forEach(({ date, amount }) => {
          if (!groupedSales[date]) {
            groupedSales[date] = 0;
          }
          groupedSales[date] += amount;
        });
  
        const processedSales = Object.keys(groupedSales).map(date => ({
          date,
          amount: groupedSales[date],
        }));
  
        setSalesData(processedSales);
      } catch (error) {
        console.error("Error obteniendo ventas:", error);
      }
    };
  
    fetchSales();
  }, []);
  
  const chartData = {
    labels: salesData.length > 0 ? salesData.map(sale => sale.date) : ["No Data"],
    datasets: [
      {
        data: salesData.length > 0
          ? salesData.map(sale => {
              const amount = parseFloat(sale.amount);
              return isNaN(amount) || !isFinite(amount) ? 0 : amount;
            })
          : [0], // Default to 0 if no data
      },
    ],
  };

  return (
    <View className="flex-1 justify-between"> 
      <View className='justify-between gap-5'>
        <View className="m-2">
          <View className="flex   w-full justify-evenly ">
            <TouchableOpacity onPress={() => setPopUpVisible(true)}>
              <View className="bg-gray-100 shadow-sm items-center justify-center rounded-[8px] h-[50px] w-full">
                <Text className=" text-[15px] px-5">Extraer reporte</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text className="text-2xl font-bold text-[#003F69] ml-5">Reporte de ventas</Text>
          <View className=" justify-center items-center">
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisLabel="$"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(9, 249, 191, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(113, 142, 191, ${opacity})`,
                gridColor: (opacity = 1) => `rgba(223, 229, 238, ${opacity})`,
                style: {
                  borderRadius: 5
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#157A8C"
                }
              }}
              bezier
              style={{
                margin: 20,
                borderRadius: 5
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Text className="text-2xl font-bold text-[#003F69] ml-5">Historial de venta</Text>
      </View>
      <View className="mb-5">
        <SalesComponent />
      </View>
      <View>
        <PopUp
          visible={isPopUpVisible}
          onClose={() => setPopUpVisible(false)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    alignItems: 'center',
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  rightAction: {
    backgroundColor: '#FF4D4D',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  chart: {
    height: 300,
    width: 350,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5"
  }
});