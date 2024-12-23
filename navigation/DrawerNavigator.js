import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardMain from '../views/main/DashboardMain';
import AddItem from '../views/items/AddItem';
import React from 'react'
import CustomDrawerContent from '../components/CustomDrawerContent';
import EditItem from '../views/items/EditItem';
import ViewItems from '../views/items/ViewItems';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: { backgroundColor: '#f5f5f5'}
            }}>

            <Drawer.Screen
                name="Dashboard"
                component={DashboardMain}

                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="dashboard" size={size} color={color} />
                    ),

                    headerTitleAlign: 'left',
                    headerTintColor: '#003F69'

                }}
            />
            <Drawer.Screen
                name="Ver Productos"
                component={ViewItems}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="production-quantity-limits" size={size} color={color} />
                    ),
                    headerTitleAlign: 'left',
                    headerTintColor: '#003F69',
                    title:'Artículos'

                }}
            />
            <Drawer.Screen
                name='Añadir Productos'
                component={AddItem}
                options={{
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="pluscircle" size={size} color={color} />
                    ),
                    headerTitleAlign: 'left',
                    headerTintColor: '#003F69'
                }} />

            <Drawer.Screen
            name='Editar Productos'
            component={EditItem}
            options={{
                drawerItemStyle:{ display:'none'}
            }}
            />



        </Drawer.Navigator>
    )
}