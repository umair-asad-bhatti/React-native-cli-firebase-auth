import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from 'react-native-paper'
export default function CategoryScreen() {
    const theme = useTheme()
    return (
        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <Text style={{ color: theme.colors.onBackground, padding: 20 }}>Here we will have top navigation to add categories for expenses and income..</Text>
        </View>
    )
}