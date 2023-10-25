import { View, Alert, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useTheme, Text, Button, Divider, ActivityIndicator, List, TextInput, Snackbar, SegmentedButtons, Portal } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
export default function AddInfoScreen({ navigation }) {

  const _spacing = 20;
  const [snackVisible, setSnackVisible] = useState(false);
  const [listExpanded, setListExpended] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [amount, setAmount] = useState('')
  const [category, setcategory] = useState('expense')
  const [type, setType] = useState('')
  const theme = useTheme() //react native paper theme
  const types = [
    {
      title: 'Shopping'
    },
    {
      title: 'Rent'
    },
    {
      title: 'Home Cleaning'
    },
    {
      title: 'Medicine'
    },
    {
      title: 'Test'
    },
    {
      title: 'Test2'
    },
  ]
  const postDataToFirestore = async () => {
    if (amount <= 0 || amount.length == 0 || type.length == 0) {
      Alert.alert("Provide all values")
      return
    }
    setIsSubmitting(true)
    const userDocSnapshot = firestore().collection('Users').doc(auth().currentUser.uid)
    await userDocSnapshot.collection('Data').add({
      amount, category, date: new Date(), type
    }).then(() => {
      setSnackVisible(true)
      setIsSubmitting(false)
      setAmount("")
      navigation.navigate("HomeScreen")
    })
  }
  return (
    <View style={{ flex: 1, gap: 20, backgroundColor: theme.colors.background, padding: _spacing }}>
      <Portal>

        <Snackbar wrapperStyle={{ marginTop: 0 }} duration={1000} elevation='5' style={{ backgroundColor: theme.colors.tertiary }}
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
        >
          Saved Successfully
        </Snackbar>
      </Portal>

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
        <View style={{ justifyContent: 'center', gap: 20 }}>
          <Text variant='titleLarge'>Select Type of {category}</Text>
          <List.Accordion

            title={type.length == 0 ? 'Select Type' : type}
            expanded={listExpanded}
            onPress={() => { setListExpended(!listExpanded) }}>
            <ScrollView style={{ height: 200 }}>
              {
                types.map((obj, index) => {
                  return (

                    <List.Item key={index} onPress={() => { setType(obj.title); setListExpended(false) }} title={obj.title} right={props => type == obj.title ? <List.Icon {...props} icon="check" /> : ''} />
                  )
                })
              }
            </ScrollView>
          </List.Accordion>
        </View>

        <Divider bold />
        <View style={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}>

          <TextInput keyboardType='numeric' placeholder='Enter Amount' mode='outlined' value={amount} onChangeText={setAmount} style={{ width: '100%' }} />
        </View>
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