import { View, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import '../global.css'

const SuccessAnimation = () => {
    return (
        <View>
            <LottieView
                source={require("../assets/animation/Success.json")}
                autoPlay
                loop={false}
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    animation: {
        width: 150,
        height: 150,
    },
});

export default SuccessAnimation