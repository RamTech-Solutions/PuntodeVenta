import { View, Text, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import useSalesData from '../hooks/useSalesData';
import { Picker } from '@react-native-picker/picker';


const PopUp = ({ visible, onClose }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const { sales, loading } = useSalesData();

    const options = [
        { id: 1, label: 'Guardar como hoja de cálculo' },
        { id: 2, label: 'Guardar como PDF' },
    ];

    const filteredSales = sales.filter(sale => {
        const saleDate = sale.timestamp.toDate();
        return saleDate.getMonth() + 1 === selectedMonth && saleDate.getFullYear() === selectedYear;
    });

    const generateChartURL = () => {
        const salesByDate = {};
    
        // Sort filteredSales by date (ascending order)
        const sortedSales = [...filteredSales].sort((a, b) => a.timestamp.toDate() - b.timestamp.toDate());
    
        // Process sorted sales
        sortedSales.forEach(sale => {
            const date = sale.timestamp.toDate().toLocaleDateString();
            salesByDate[date] = (salesByDate[date] || 0) + sale.total;
        });
    
        const labels = Object.keys(salesByDate);
        const data = Object.values(salesByDate);
    
        return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{ label: 'Ventas', data: data }]
            }
        }))}`;
    };

    const generatePDF = async () => {
        if (!filteredSales || filteredSales.length === 0) {
            alert('No hay datos de ventas para este mes.');
            return;
        }

        const chartURL = generateChartURL();
        const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0).toFixed(2);

        const htmlContent = `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1, h2 { color: #003F69; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                    th { background-color: #003F69; color: white; }
                    img { display: block; margin: 0 auto; }
                </style>
            </head>
            <body>
                <h1>Reporte de Ventas - ${selectedMonth}/${selectedYear}</h1>
                <img src="${chartURL}" width="100%" />
                <h2>Total de Ventas: $${totalSales}</h2>
                <table>
                    <tr>
                        <th>Fecha</th>
                        <th>Método de Pago</th>
                        <th>Total</th>
                        <th>Productos</th>
                    </tr>
                    ${filteredSales.map(sale => `
                        <tr>
                            <td>${sale.timestamp.toDate().toLocaleDateString()}</td>
                            <td>${sale.paymentMethod}</td>
                            <td>$${sale.total.toFixed(2)}</td>
                            <td>
                                <ul>
                                    ${sale.productos.map(p => `<li>${p.name} (${p.quantity}x $${p.price})</li>`).join('')}
                                </ul>
                            </td>
                        </tr>
                    `).join('')}
                </table>
            </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent, base64: false });
            alert('PDF generado correctamente.');
            sharePDF(uri);
        } catch (error) {
            console.error('Error generando PDF:', error);
        }
    };

    const sharePDF = async (filePath) => {
        try {
            await Sharing.shareAsync(filePath);
        } catch (error) {
            console.error('Error compartiendo PDF:', error);
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white rounded-lg p-5 shadow-lg">
                    <Text className="text-lg font-bold text-[#003F69] text-center">Selecciona el formato</Text>

                    <Picker
                        style={{height:'', color: '#000000'}}
                        itemStyle={{ color: '#000000' }} // Set the color of the picker items
                        selectedValue={selectedMonth.toString()} // Convert to string
                        onValueChange={(itemValue) => setSelectedMonth(parseInt(itemValue, 10))} // Convert back to number
                    >
                        {[...Array(12).keys()].map(m => (
                            <Picker.Item key={m + 1} label={`Mes ${m + 1}`} value={(m + 1).toString()} /> // Ensure value is a string
                        ))}
                    </Picker>

                    <Picker
                        style={{height:'', color: '#000000'}}
                        itemStyle={{ color: '#000000' }} // Set the color of the picker items
                        selectedValue={selectedYear.toString()} // Convert to string
                        onValueChange={(itemValue) => setSelectedYear(parseInt(itemValue, 10))} // Convert back to number
                    >
                        {[2023, 2024, 2025].map(y => (
                            <Picker.Item key={y} label={y.toString()} value={y.toString()} /> // Ensure value is a string
                        ))}
                    </Picker>

                    {loading ? (
                        <ActivityIndicator size="large" color="#003F69" className="mt-4" />
                    ) : (
                        options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                className="flex-row-reverse justify-between items-center gap-4 py-3"
                                onPress={() => setSelectedOption(option.id)}
                            >
                                <View className={`h-5 w-5 rounded-full border-2 ${selectedOption === option.id ? 'bg-[#003F69] border-[#003F69]' : 'border-gray-400'}`} />
                                <Text className="text-base text-gray-700">{option.label}</Text>
                            </TouchableOpacity>
                        ))
                    )}
                    <View className="flex-row justify-end gap-5">
                        <TouchableOpacity className="px-5 py-2 rounded-md border border-[#C10C0C]" onPress={onClose}>
                            <Text className="text-[#C10C0C] font-bold">Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="px-5 py-2 rounded-md border border-[#003F69]"
                            onPress={() => {
                                if (selectedOption === 2) generatePDF();
                            }}
                        >
                            <Text className="text-[#003F69] font-bold">Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PopUp;
