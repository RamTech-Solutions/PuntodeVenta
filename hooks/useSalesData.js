import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase-config.js'; // Asegúrate de importar Firestore

const useSalesData = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const userId = auth.currentUser?.uid; // Obtiene el ID del usuario autenticado
                if (!userId) return;

                const salesRef = collection(db, `usuarios/${userId}/ventas`);
                const querySnapshot = await getDocs(query(salesRef));

                const salesList = [];
                querySnapshot.forEach(doc => {
                    salesList.push({ id: doc.id, ...doc.data() });
                });

                setSales(salesList);
            } catch (error) {
                console.error("Error obteniendo ventas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    return { sales, loading };
};

export default useSalesData;
