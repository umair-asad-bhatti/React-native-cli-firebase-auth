import { View, Text } from 'react-native'
import React from 'react'

export default function NoDataFound() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text>No data...</Text>
        </View>
    )
}