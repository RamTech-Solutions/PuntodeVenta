import { View, Text, Modal, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';

const PopUp = ({ visible, onClose }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Opciones del modal
    const options = [
        { id: 1, label: 'Guardar como hoja de cálculo' },
        { id: 2, label: 'Guardar como PDF' },
    ];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-white rounded-lg p-5 shadow-lg">
                    {/* Header */}
                    <View className="mb-4">
                        <Text className="text-lg font-bold text-[#003F69] text-center">
                            Selecciona el formato
                        </Text>
                    </View>

                    {/* Opciones */}
                    <View className="mb-6">
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                className="flex-row-reverse justify-between items-center gap-4 py-3"
                                onPress={() => setSelectedOption(option.id)}
                            >
                                {/* Círculo de selección */}
                                <View
                                    className={`h-5 w-5 rounded-full border-2 ${selectedOption === option.id
                                            ? 'bg-[#003F69] border-[#003F69]'
                                            : 'border-gray-400'
                                        }`}
                                />
                                {/* Texto de la opción */}
                                <Text className="text-base text-gray-700">{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Bottom */}
                    <View className="flex-row justify-end gap-5">
                        <TouchableOpacity
                            className="px-5 py-2 rounded-md border border-[#C10C0C]"
                            onPress={onClose}
                        >
                            <Text className="text-[#C10C0C] font-bold">Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="px-5 py-2 rounded-md border border-[#003F69]">

                            <Text className="text-[#003F69] font-bold">Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PopUp;
