import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';

export default function Scanner({ navigation, route }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(true);
    const barcodeLock = useRef(false);
    const [cameraActive, setCameraActive] = useState(true);

    // parámetro para saber dónde estoy
    const { mode } = route.params || {};


    useEffect(() => {
        // Detecta cuando la pantalla pierde el foco y desactiva la cámara
        const unsubscribeBlur = navigation.addListener('blur', () => {
            setCameraActive(false); // Apaga la cámara
        });

        // Detecta cuando la pantalla vuelve a estar activa y enciende la cámara
        const unsubscribeFocus = navigation.addListener('focus', () => {
            setCameraActive(true); // Enciende la cámara
        });

        return () => {
            unsubscribeBlur(); // Limpia el listener de blur
            unsubscribeFocus(); // Limpia el listener de focus
        };
    }, [navigation]);


    if (!permission) {
        return <View />; // Camera permissions are still loading.
    }

    if (!permission.granted) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-white text-xl mb-4">Necesitamos permiso para acceder a la cámara</Text>
                <TouchableOpacity onPress={requestPermission} className="bg-blue-500 px-4 py-2 rounded">
                    <Text className="text-white text-lg">Acceder a la cámara</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Maneja el escaneo de códigos de barras 
    async function handleBarcodeScanned({ data }) {
        if (data && !barcodeLock.current && scanning) {
            barcodeLock.current = true;
            setScanning(false); // Desactiva el escaneo después de un escaneo exitoso
            setTimeout(async () => {
                // Realiza la llamada a la API para obtener el producto
                try {
                    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${data}.json`);
                    const json = await response.json();

                    // Verifica si el producto tiene un nombre
                    const productName = json.product?.product_name || 'Product name not found';
                    const categoriesString = json.product.categories || "Categorías no disponibles";
                    const image = json.product.image_front_small_url || "Imagen no disponible";

                    const categoriesArray = categoriesString
                        .split(",")
                        .map((category) => category.trim())
                        .filter((category) => !category.startsWith("en:"));


                    const categoriesFormatted = categoriesArray.join(", ");

                    // Dependiendo del contexto, realiza una acción diferente
                    if (mode === 'addItem') {
                        // Si es para agregar un producto
                        Alert.alert('Product Information', `Código de barras/ID: ${data}\nNombre del producto: ${productName}, \nCategoría: ${categoriesFormatted}`, [
                            {
                                text: 'OK',
                                onPress: () => {
                                    barcodeLock.current = false;
                                    setScanning(true);

                                    navigation.navigate('Añadir Productos', {
                                        barcode: data,
                                        productName: productName,
                                        categories: categoriesFormatted,
                                        url: image

                                    });
                                }
                            }
                        ]);
                    } else if (mode === 'addToBasket') {
                        // Si es para agregar a la canasta de venta
                        Alert.alert('Producto añadido a la caja ', `Código de barras: ${data}\Nombre del producto: ${productName}`, [
                            {
                                text: 'OK',
                                onPress: () => {
                                    barcodeLock.current = false;
                                    setScanning(true);
                                }
                            }
                        ]);
                    }
                } catch (error) {
                    Alert.alert('Error', 'Unable to fetch product information. Please try again later.');
                    barcodeLock.current = false;
                    setScanning(true);
                }
            }, 500);
        }
    }

    return (
        <View className="flex-1 ">

            {cameraActive && (
                <CameraView
                    style={{ flex: 1 }}
                    onBarcodeScanned={handleBarcodeScanned}
                />
            )}
        </View>
    );
}
