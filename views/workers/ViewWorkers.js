import "../../global.css";
import { Dropdown } from 'react-native-element-dropdown';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

//Firestore
import { getFirestore, collection, getDocs, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase-config.js';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);


const data = [
    { label: 'Nombre a-z', value: 'name_asc' },
    { label: 'Nombre z-a', value: 'name_desc' },
    { label: 'Puesto', value: 'role_asc' }
];


export default function ViewWorkers({ navigation }) {
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);


    const swipeableRefs = useRef(new Map());

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const userId = auth.currentUser?.uid;
                if (!userId) {
                    console.error("Usuario no autenticado");
                    return;
                }

                const userArticlesRef = collection(db, `usuarios/${userId}/trabajadores`);

                // Usamos onSnapshot para escuchar cambios en tiempo real
                const unsubscribe = onSnapshot(userArticlesRef, (querySnapshot) => {
                    const workerList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setItems(workerList);
                    setFilteredItems(workerList);
                });

                return () => unsubscribe(); 
            } catch (error) {
                console.error("Error obteniendo productos: ", error);
            }
        };

        fetchProducts();
    }, []);


    const closeAllSwipes = () => {
        swipeableRefs.current.forEach(ref => ref?.close());
    };


    const deleteItem = async (id) => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) {
                console.error("Usuario no autenticado");
                return;
            }
            await deleteDoc(doc(db, `usuarios/${userId}/trabjadores`, id));
            setItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error eliminando producto: ", error);
        }
        swipeableRefs.current.get(id)?.close();
    };

    const navigateToEdit = (item) => {
        navigation.navigate('Editar Trabajador', { item });
    };

    const handleFilterChange = (selectedValue) => {
        setValue(selectedValue);
        let sortedItems = [...items];

        switch (selectedValue) {
            case 'name_asc':
                sortedItems.sort((a, b) => {
                    if (a.name && b.name) {
                        return a.name.localeCompare(b.name);
                    }
                    return 0;
                });
                break;
            case 'name_desc':
                sortedItems.sort((a, b) => {
                    if (a.name && b.name) {
                        return b.name.localeCompare(a.name);
                    }
                    return 0;
                });
                break;
            case 'role_asc':
                sortedItems.sort((a, b) => {
                    if (a.role && b.role) {
                        return a.role.localeCompare(b.role);
                    }
                    return 0;
                });
                break;

            default:
                break;
        }

        setFilteredItems(sortedItems);
    };

    const renderRightActions = (item) => (
        <View className="flex flex-row-reverse ">
            <View className="justify-center items-center">
                <TouchableOpacity
                    onPress={() => deleteItem(item.id)}
                    className="bg-red-500 justify-center items-center w-20 h-[95px] rounded-lg "
                >
                    <Text className="text-white font-bold">Eliminar</Text>
                </TouchableOpacity>
            </View>

            <View className="justify-center items-center">
                <TouchableOpacity
                    onPress={() => navigateToEdit(item)}
                    className="bg-[#003F69] justify-center items-center w-20 h-[95px] rounded-lg "
                >
                    <Text className="text-white font-bold">Editar</Text>
                </TouchableOpacity>
            </View>
        </View>



    );

    const renderItem = ({ item }) => (
        <Swipeable
            ref={(ref) => {
                if (ref) swipeableRefs.current.set(item.id, ref);
            }}
            renderRightActions={() => renderRightActions(item)}
            onSwipeableWillOpen={() => closeAllSwipes()}
            onSwipeableClose={() => swipeableRefs.current.delete(item.id)}
            overshootRight={false}
            overshootLeft={false}
            friction={2}
        >
            <View className="w-full h-[95px] border border-[#157A8C]  justify-center bg-white p-4 my-2 rounded-lg">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-blue-900">{item.name}</Text>
                    <Text className="text-sm text-gray-500">{item.role}</Text>
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
                            placeholder="Filtrar trabajadores"
                            value={value}
                            onChange={item => handleFilterChange(item.value)}

                            renderLeftIcon={() => (
                                <Ionicons className="mr-3" name="filter-outline" size={20} color="#106B87" />
                            )}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Añadir Trabajador')}>
                            <View className="bg-[#003F69] w-40 rounded-lg h-[50px] items-center justify-center">
                                <Text className="text-white text-center">Agregar +</Text>
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
                <FlatList
                    data={filteredItems}
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

