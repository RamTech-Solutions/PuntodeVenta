import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-native-paper';
import React from 'react'

//Vistas
import DashboardMain from '../views/main/DashboardMain';
import CustomDrawerContent from '../components/CustomDrawerContent';
import SalesReport from '../views/report/SalesReport';
import MainConfiguration from '../views/configuration/MainConfiguration';
import ScanProduct from '../views/sales/ScanProduct';
import ScannerPage from '../views/scanner/ScannerPage';
import SalesHistory from '../views/report/SalesHistory';

//Items
import EditItem from '../views/items/EditItem';
import ViewItems from '../views/items/ViewItems';
import AddItem from '../views/items/AddItem';

//Suppliers
import ViewClients from '../views/clients/ViewClients';
import AddSuppliers from '../views/clients/AddSuppliers';
import EditSuppliers from '../views/clients/EditSuppliers';

//Config
import CustomApp from '../views/configuration/acciones/CustomApp';
import NotificationSettings from '../views/configuration/acciones/NotificationSettings';
import PasswordScreen from '../views/configuration/acciones/PasswordScreen';
import AboutUs from '../views/configuration/soporte/AboutUs';
import ContactUs from '../views/configuration/soporte/ContactUs';
import HelpScreen from '../views/configuration/soporte/HelpScreen';
import ResetConfirmation from '../views/configuration/acciones/ResetConfirmation';

//Workers
import ViewWorkers from '../views/workers/ViewWorkers';
import AddWorkers from '../views/workers/AddWorkers';
import EditWorkers from '../views/workers/EditWorkers';

//Sales Page
import SalesPage from '../views/sales/SalesPage';
import CashierPage from '../views/sales/CashierPage';
import PaymentSuccessful from '../views/sales/PaymentSuccessful';

//Iconos
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (

        <Provider>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
                screenOptions={{
                    drawerStyle: { backgroundColor: '#f5f5f5' }
                }}>

                {/* Drawer related */}
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
                    name="Historial de ventas"
                    component={SalesHistory}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <FontAwesome name="history" size={size} color={color} />
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

                {/* Workers */}
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
                    name='Editar Trabajador'
                    component={EditWorkers}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
                <Drawer.Screen
                    name='Añadir Trabajador'
                    component={AddWorkers}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
                {/* Product Screens */}
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

                {/* supplier screens */}
                <Drawer.Screen
                    name='Ver proveedores'
                    component={ViewClients}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Ionicons name="business" size={size} color={color} />
                        ),
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69',
                        title: "Proveedores"

                    }} />
                <Drawer.Screen
                    name='Añadir proveedores'
                    component={AddSuppliers}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitleAlign: 'left'
                    }}
                />
                <Drawer.Screen
                    name='Editar proveedores'
                    component={EditSuppliers}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69'
                    }}
                />

                {/* Sales page */}
                <Drawer.Screen
                    name='Venta'
                    component={SalesPage}
                    options={{
                        drawerIcon: ({ color, size }) => (
                            <Entypo name="shopping-bag" size={size} color={color} />
                        ),
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69',
                    }} />

                <Drawer.Screen
                    name='Cajero'
                    component={CashierPage}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69',
                    }} />

                <Drawer.Screen
                    name='Escanear Productos'
                    component={ScanProduct}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69'
                    }}
                />
                <Drawer.Screen
                    name='Scanner'
                    component={ScannerPage}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        headerTitleAlign: 'left',
                        headerTintColor: '#003F69'
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
                <Drawer.Screen
                    name='Acerca de nosotros'
                    component={AboutUs}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
                <Drawer.Screen
                    name='Contactanos'
                    component={ContactUs}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />

                <Drawer.Screen
                    name='Ayuda & FAQs'
                    component={HelpScreen}
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
            </Drawer.Navigator>

        </Provider>

    )
}