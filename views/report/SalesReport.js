
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useRef } from 'react'
import '../../global.css'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import { LineChart } from "react-native-chart-kit";
import { Provider as PaperProvider } from 'react-native-paper';
import MyComponent from '../../components/DataTable';
import PopUp from '../../components/PopUp';




const data = [
  { label: 'Ventas de artículos', value: '1' },
  { label: 'Empleados', value: '2' },
  { label: 'Venta por categoría', value: '3' },
];




export default function SalesReport() {
  const [value, setValue] = useState(null);
  const [isPopUpVisible, setPopUpVisible] = useState(false);



  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex-1 justify-between">
      <View className='justify-between gap-5'>
        <View className="m-2">
          <View className="flex flex-row w-full justify-evenly gap-2">
            <View className="w-[210px]">
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Filtrar productos"
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
                renderLeftIcon={() => (
                  <Ionicons className="mr-3" name="filter-outline" size={20} color="#106B87" />
                )}
              />
            </View>
            <TouchableOpacity onPress={()=> setPopUpVisible(true)}>
              <View className="bg-[#D9D9D9] items-center justify-center rounded-[8px] h-[50px] w-[160px]">
                <Text className=" text-[15px] px-5">Extraer reporte</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <View>
          <Text className="text-2xl font-bold text-[#003F69] ml-5">Reporte de ventas</Text>
          <View className=" justify-center items-center">
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2, // optional, defaults to 2dp
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
        <MyComponent />
      </View>

      <View>
        {/* Componente PopUp */}
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