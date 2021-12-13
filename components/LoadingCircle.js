import React from 'react';
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { styles } from "../styles"

export const LoadingCircle = () => {
    return <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
    </View>
}