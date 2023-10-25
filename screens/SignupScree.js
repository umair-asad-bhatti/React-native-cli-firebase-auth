import auth from '@react-native-firebase/auth';
import { React, useState, useEffect } from 'react';
import helpers from '../Helper';
import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, HelperText, TextInput, useTheme, Text } from 'react-native-paper';
export default function SignUpScreen({ navigation }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Confirmpassword, setConfirmpassword] = useState('')
    const [Username, setUsername] = useState('')
    const [signingUp, setSigningUp] = useState(false)
    const [error, setError] = useState('')
    const theme = useTheme()
    useEffect(() => {
        try {
            if (Username.length == 0 || Username.length < 3)
                throw new Error('username cannot be empty or less than 3 characters')
            if (Email.length == 0)
                throw new Error('email cannot be empty')
            if (!helpers.isValidEmail(Email))
                throw new Error('Invaid email format')
            if (Password.length == 0)
                throw new Error('password cannot be empty')
            if (Password.length < 8)
                throw new Error('password must be 8 characters long')
            if (Password != Confirmpassword && Confirmpassword.length > 0)
                throw new Error('password does not match with confirm password.')
        } catch (error) {
            setError(error.message)
            return;
        }
        //if no error then setting the error state as empty
        setError('')
    })
    const signUp = () => {
        setSigningUp(true)
        auth().createUserWithEmailAndPassword(Email, Password)
            .then(response => {
                response.user.updateProfile({ displayName: Username }).then(r => {
                    setSigningUp(false)
                })
            })
            .catch(error => { Alert.alert(error.code); setSigningUp(false) })
    }
    return (

        <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View style={[styles.logo_container]}>
                        {/* <Image resizeMode='contain' style={styles.logo_image} source={require('../assets/signup.png')} /> */}
                        <Text style={{ marginTop: 20, color: theme.colors.primary }} variant='displaySmall'>Get Started</Text>
                        <Text style={{ color: theme.colors.primary }} variant='bodyLarge'>its quick and easy</Text>
                    </View>
                    <View style={styles.inputs_container}>
                        <View style={{ width: '100%' }}>
                            <TextInput value={Username} onChangeText={setUsername} left={<TextInput.Icon icon='account' />} mode='outlined' label={'Enter UserName'} />
                            {
                                error.includes('username') &&
                                <HelperText type='error'>{error}</HelperText>
                            }
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput left={<TextInput.Icon icon='email' />} onChangeText={setEmail} value={Email} mode='outlined' label={'Enter Email'} />
                            {
                                error.includes('email') &&
                                <HelperText type='error'>{error}</HelperText>
                            }
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput value={Password} onChangeText={setPassword} left={<TextInput.Icon icon='lock' />} secureTextEntry={true} mode='outlined' label={'Enter Password'} />
                            {
                                error.includes('password') &&
                                <HelperText type='error'>{error}</HelperText>
                            }
                        </View>
                        <View style={{ width: '100%' }}>
                            <TextInput left={<TextInput.Icon icon="lock-check" />} secureTextEntry={true} mode='outlined' label={'Confirm Password'} value={Confirmpassword} onChangeText={setConfirmpassword} />
                        </View>

                        <View style={{ width: '100%' }}>
                            {
                                signingUp ?
                                    <ActivityIndicator color={theme.colors.onBackground} /> :
                                    <Button disabled={error.length > 0 ? true : false} mode='contained' onPress={signUp}>
                                        Sign Up
                                    </Button>
                            }
                            <Text style={{ textAlign: 'center', marginTop: 10, color: theme.colors.onBackground }}>Dont have an acoount?<Text onPress={() => navigation.navigate("LoginScreen")} style={{ color: theme.colors.primary }}> Login here</Text></Text>
                        </View>
                    </View>
                </View>
            </View >
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    logo_container: {
        flex: 0.3,
        marginBottom: 40,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logo_image: { width: 120, height: 120 },
    inputs_container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 0.6,
        gap: 20,
        padding: 20
    },
})