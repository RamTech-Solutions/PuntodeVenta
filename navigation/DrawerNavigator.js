import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-native-paper';

//Vistas
import DashboardMain from '../views/main/DashboardMain';
import AddItem from '../views/items/AddItem';
import React from 'react'
import CustomDrawerContent from '../components/CustomDrawerContent';
import EditItem from '../views/items/EditItem';
import ViewItems from '../views/items/ViewItems';
import SalesReport from '../views/report/SalesReport';
import ViewWorkers from '../views/workers/ViewWorkers';
import MainConfiguration from '../views/configuration/MainConfiguration';

//Config
import CustomApp from '../views/configuration/acciones/CustomApp';
import NotificationSettings from '../views/configuration/acciones/NotificationSettings';
import PasswordScreen from '../views/configuration/acciones/PasswordScreen';
import AboutUs from '../views/configuration/soporte/AboutUs';
import ContactUs from '../views/configuration/soporte/ContactUs';
import HelpScreen from '../views/configuration/soporte/HelpScreen';

//Iconos
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Provider>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: { backgroundColor: '#f5f5f5' }
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
                    name="Informe de ventas"
                    component={SalesReport}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Entypo name="bar-graph" size={size} color={color} />
                        ),
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69',

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
                        title: 'Artículos'

                    }}
                />
                <Drawer.Screen
                    name="Ver Trabajadores"
                    component={ViewWorkers}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <FontAwesome name="users" size={size} color={color} />
                        ),
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69',
                        title: 'Trabajadores'

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
                        headerTintColor: '#003F69',
                        drawerItemStyle: { display: 'none' }
                    }} />

                <Drawer.Screen
                    name='Editar Productos'
                    component={EditItem}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />

                {/* Config Screens */}
                <Drawer.Screen
                    name='Configuración'
                    component={MainConfiguration}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <FontAwesome6 name="gear" size={size} color={color} />
                        ),
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69'
                    }} />

                <Drawer.Screen
                    name='Personalizar App'
                    component={CustomApp}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />

                <Drawer.Screen
                    name='Notificaciones'
                    component={NotificationSettings}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
                <Drawer.Screen
                    name='Cambiar Contraseña'
                    component={PasswordScreen}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />




            </Drawer.Navigator>

        </Provider>
    )
}