import { View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Button, Divider, useTheme, RadioButton, Text, Modal, Portal, Snackbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth'
import { ThemeContext } from '../utils/ThemeProvider';

const _spacing = 20
export default function SettingsScreen() {
  const { userTheme, setuserTheme, toggleTheme, userPreference, setUserPreference } = useContext(ThemeContext)
  const theme = useTheme()
  const [visible, setVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false)
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={{ flex: 1, padding: _spacing, backgroundColor: theme.colors.background }}>
      <Portal>
        <Snackbar wrapperStyle={{marginTop:0}} duration={1000} elevation='5' style={{ backgroundColor: theme.colors.tertiary }}
          visible={snackVisible}
          onDismiss={() => setSnackVisible(false)}
        >
          {`${userPreference} theme is set`} 
        </Snackbar>
      </Portal>
      <Text variant='titleLarge' style={{ color: theme.colors.onBackground, marginBottom: _spacing, textAlign: 'center' }}>Settings</Text>
      <View style={{ flex: 1, gap: _spacing, justifyContent: 'center' }}>


        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', gap: _spacing }}>
          <Text style={{ marginTop: 10 }}>UserName Settings</Text>
          <Button icon='rename-box' mode='contained' >
            Change Username
          </Button>

        </View>


        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', gap: _spacing }}>
          <Text style={{ marginTop: 10 }}>Password Settings</Text>
          <Button icon='lock' mode='contained'>
            Change Password
          </Button>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', gap: _spacing }}>
          <Text style={{ marginTop: 10 }}>Theme Settings</Text>
          <Button icon='format-color-highlight' mode='contained' onPress={showModal}>
            Change Theme
          </Button>
          <Portal style={{ padding: _spacing, widht: 200 }}>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: theme.colors.background, padding: 20, alignItems: 'center' }}>
              <RadioButton.Group onValueChange={newValue => {
                //when value of radio is changed show the snack after 500ms that value is changed
                setTimeout(() => {
                  setSnackVisible(true)
                }, 500)
                setVisible(false)//set the visiblity of modal after value is changed

                //setting themes states and user preferences
                if (newValue == 'system') {
                  setUserPreference('system')
                  setuserTheme('system')
                }

                else {
                  setUserPreference(newValue);
                  setuserTheme(newValue)
                }

              }}
                value={userTheme} style={{ gap: 30 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <RadioButton value="system" />
                  <Text>System Theme</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <RadioButton value="light" />
                  <Text>Light Theme</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <RadioButton value="dark" />
                  <Text>Dark Theme</Text>
                </View>
              </RadioButton.Group>
            </Modal>
          </Portal>
        </View>
        <Divider bold={true} style={{ marginVertical: _spacing }} />
        <Button icon='help-box' mode='contained' >
          Support Us
        </Button>
        <Divider bold={true} style={{ marginVertical: _spacing }} />
        <Button icon='pencil-box' mode='contained' >
          Changelog
        </Button>
        <Button icon='information-outline' mode='contained'>
          About Us
        </Button>
        <Divider bold={true} style={{ marginVertical: _spacing }} />
        <Button buttonColor={theme.colors.error} icon='logout' mode='contained' onPress={() => {
          auth().signOut()
        }} >
          SignOut
        </Button>

      </View>
    </View >
  )
}