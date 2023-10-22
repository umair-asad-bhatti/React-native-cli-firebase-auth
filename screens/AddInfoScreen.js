import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme, Text, Button, Divider, TextInput, Surface, SegmentedButtons } from 'react-native-paper'
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
export default function AddInfoScreen() {
  const _spacing = 20;
  const [amount, setAmount] = useState('0')
  const [type, setType] = useState('expense')
  const [date, setDate] = useState(new Date())

  const theme = useTheme() //react native paper theme

  useEffect(() => {
    const getUsersCollection = async () => {

      try {
        const usersCollection = firestore().collection('Users');
        const querySnapshot = await usersCollection.get();
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
        });
      } catch (error) {
        console.error('Error getting documents: ', error);
      }


    }
    getUsersCollection()
  })


  return (
    <View style={{ flex: 1, gap: 20, backgroundColor: theme.colors.background, padding: _spacing }}>
      <Text variant='titleLarge' style={{ textAlign: 'center' }}>Enter Details </Text>
      <Divider bold />
      <View elevation={5} style={{ padding: _spacing, gap: _spacing }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text variant='titleLarge'>Type: </Text>
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={[
              {
                value: 'expense',
                label: 'Expense',
                checkedColor: theme.colors.primary,
              },
              {
                value: 'income',
                label: 'Income',
                checkedColor: theme.colors.primary,
              },
            ]}
          />
        </View>
        <Divider bold />

        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text variant='titleLarge'>Amount: </Text>
          <TextInput keyboardType='numeric' placeholder='Enter Amount' mode='outlined' value={amount} onChangeText={setAmount} style={{ width: '100%' }} />
        </View>
        <Divider bold />
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text variant='titleLarge'>Date: </Text>
        
        </View>
        <Divider bold />
      </View>
    </View>
  )
}