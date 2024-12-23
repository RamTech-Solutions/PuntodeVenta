import "../../global.css";
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState } from 'react';
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const data = [
    { label: 'Nombre a-z', value: '1' },
    { label: 'Nombre z-a', value: '2' },
    { label: 'Menor precio', value: '3' },
    { label: 'Mayor precio', value: '4' },
    { label: 'Categoria', value: '5' },
];

const screenWidth = Dimensions.get('window').width;

export default function ViewItems() {
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { id: 1, name: 'No.Example', category: 'Category Example', price: '$24.99' },
        { id: 2, name: 'Another Example', category: 'Another Category', price: '$19.99' },
    ]);

    const swipeableRefs = useRef(new Map());

    const closeAllSwipes = () => {
        swipeableRefs.current.forEach(ref => ref?.close());
    };

    const deleteItem = (id) => {
        setItems(prevItems => prevItems.filter(item => item.id !== id));
        swipeableRefs.current.get(id)?.close();
    };

    const renderRightActions = (id) => (
        <View className="justify-center items-center">
            <TouchableOpacity
                onPress={() => deleteItem(id)}
                className="bg-red-500 justify-center items-center w-20 h-[95px] rounded-lg "
            >
                <Text className="text-white font-bold">Eliminar</Text>
            </TouchableOpacity>
        </View>

    );

    const renderItem = ({ item }) => (
        <Swipeable
            ref={(ref) => {
                if (ref) swipeableRefs.current.set(item.id, ref);
            }}
            renderRightActions={() => renderRightActions(item.id)}
            onSwipeableWillOpen={() => closeAllSwipes()}
            onSwipeableClose={() => swipeableRefs.current.delete(item.id)}
            overshootRight={false}
            overshootLeft={false}
            friction={2}
        >
            <View className="w-full h-[95px] border border-[#157A8C]  justify-center bg-white p-4 my-2 rounded-lg">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-lg font-bold text-blue-900">{item.name}</Text>
                        <Text className="text-sm text-gray-500">{item.category}</Text>
                    </View>
                    <Text className="text-base font-semibold text-red-500 mt-1">{item.price}</Text>
                </View>

            </View>
        </Swipeable>
    );

    return (
        <GestureHandlerRootView className="flex-1">
            <View className="flex-1 w-full px-4 bg-gray-100">
                <View className="flex-row justify-between mt-5 items-center">
                    <View className="w-64">
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
                    <View>
                        <View className="bg-[#003F69] w-40 rounded-lg h-[50px] items-center justify-center">
                            <Text className="text-white text-center">Agregar +</Text>
                        </View>

                    </View>

                </View>
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        alignItems: 'center',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

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
});
