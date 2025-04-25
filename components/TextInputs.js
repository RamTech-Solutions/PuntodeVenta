import { View, Text, TextInput } from 'react-native'
import '../global.css'
import React from 'react'

export default function TextInputs({ titulo, placeHolder, value, onChangeText }) {
    return (
        <View className="gap-2">
            <Text className="text-[16px] text-[#2A3256] font-semibold">{titulo}</Text>
            <View className="bg-gray-300 p-5 w-full rounded-lg">
                <TextInput
                placeholder={placeHolder}
                value={value}
                onChangeText={onChangeText}/>
            </View>

        </View>
    )
}