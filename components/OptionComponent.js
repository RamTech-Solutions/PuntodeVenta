import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import '../global.css'
import { useNavigation } from '@react-navigation/native'

const OptionComponent = ({option,link}) => {
    const navigation = useNavigation();


    return (
        <TouchableOpacity onPress={()=> navigation.navigate(link)}>
            <View className="w-full bg-gray-200 rounded-lg p-2">
                <Text className="text-lg font-semibold">{option}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default OptionComponent