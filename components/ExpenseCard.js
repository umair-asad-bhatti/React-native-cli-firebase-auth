import { View } from 'react-native'
import React from 'react'
import { Button, Text } from 'react-native-paper'

export default function ExpenseCard({ item, theme }) {
    return (
        <View style={{ borderRadius: 20, padding: 20, borderColor: theme.colors.primary, borderWidth: 1, margin: 10 }}>
            <Text>Amount : {item.amount}</Text>
            <Text>Type : {item.type}</Text>
            <Text>Category : {item.category}</Text>
            <Text>Date : {item.date.toString()}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 20 }}>
                <Button style={{ marginTop: 20 }} mode='contained' >Delete</Button>
                <Button style={{ marginTop: 20 }} mode='contained' >Edit</Button>
            </View>
        </View>
    )
}