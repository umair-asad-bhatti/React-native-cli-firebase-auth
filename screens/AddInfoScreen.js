import { View, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme, Text, Button, Divider, ActivityIndicator, List, TextInput, Snackbar, SegmentedButtons, Portal } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
export default function AddInfoScreen() {

  const _spacing = 20;
  const [snackVisible, setSnackVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState('')
  const [category, setcategory] = useState('expense')
  const [listExpanded, setListExpended] = useState(false)
  const theme = useTheme() //react native paper theme
  const postDataToFirestore = async () => {
    if (amount <= 0 || amount.length == 0) {
      Alert.alert("Amount must be greater than 0s!!!")
      return
    }
    setIsSubmitting(true)
    const userDocSnapshot = firestore().collection('Users').doc(auth().currentUser.uid)
    const userCollection = await userDocSnapshot.collection('Data').add({
      amount, category, date: new Date()
    }).then(() => {
      setSnackVisible(true)
      setIsSubmitting(false)
      setAmount("")
    })
  }

  return (
    <View style={{ flex: 1, gap: 20, backgroundColor: theme.colors.background, padding: _spacing }}>
      <Snackbar wrapperStyle={{ marginTop: 0 }} duration={1000} elevation='5' style={{ backgroundColor: theme.colors.tertiary }}
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
      >
        Saved Successfully
      </Snackbar>

      <Text variant='titleLarge' style={{ textAlign: 'center' }}>Enter Details </Text>
      <Divider bold />


      <View elevation={5} style={{ padding: _spacing, gap: _spacing }}>
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <Text variant='titleLarge'>category: </Text>
          <SegmentedButtons
            value={category}
            onValueChange={setcategory}
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
        <List.Accordion
          title="Select Type"
          left={props => <List.Icon {...props} icon="folder" />}
          expanded={listExpanded}
          onPress={() => { setListExpended(!listExpanded) }}>
          <ScrollView style={{ height: 200 }}>
            <List.Item title="Fruit" />
            <List.Item title="Rent" />
            <List.Item title="Cooking" />
            <List.Item  title="Home" />
            <List.Item title="Shopping" />
            <List.Item title="Food" />
            <List.Item title="Clothing" />
          </ScrollView>
        </List.Accordion>

        <Divider bold />
        {
          !isSubmitting ? <Button mode='contained' onPress={postDataToFirestore}>
            Add
          </Button> :
            <ActivityIndicator />
        }

      </View>
    </View >
  )
}