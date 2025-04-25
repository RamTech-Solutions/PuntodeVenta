import { createContext, useContext, useState } from 'react';
import { auth, db } from '../firebase-config.js';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [salesHistory, setSalesHistory] = useState([]);
    const [wholeSales, setWholeSales] = useState([]);

    // Función para añadir un producto (si ya existe, aumenta cantidad)
    const addProductToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevItems.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const fetchSalesHistory = () => {
        const user = auth.currentUser;
        if (!user) return;

        const salesRef = collection(db, "usuarios", user.uid, "ventas");
        const q = query(salesRef, orderBy("timestamp", "desc"), limit(3)); // Últimas 3 ventas

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sales = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setSalesHistory(sales);
        });

        return unsubscribe; // Para limpiar la suscripción si es necesario
    };

    const fetchAllSales = () => {
        const user = auth.currentUser;
        if (!user) return;

        const salesRef = collection(db, "usuarios", user.uid, "ventas");
        const q = query(salesRef, orderBy("timestamp", "desc")); // Ordenamos por fecha

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sales = snapshot.docs.map(doc => {
                const data = doc.data();
                const productos = Object.values(data.productos || {}); // Convertir objeto en array

                return {
                    id: doc.id,
                    ...data,
                    productos
                };
            });

            setWholeSales(sales);
        });

        return unsubscribe;

    };


    // Función para actualizar cantidad
    const updateProductQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Función para eliminar producto
    const removeProductFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    //Función para calcular el total de precio
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCartItems([]);
    }


    return (
        <ProductContext.Provider value={{ cartItems, addProductToCart, updateProductQuantity, removeProductFromCart, getTotalPrice, clearCart, fetchSalesHistory, salesHistory, fetchAllSales, wholeSales  }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => useContext(ProductContext);
