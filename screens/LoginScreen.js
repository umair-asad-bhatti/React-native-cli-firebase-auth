import { View, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { useTheme } from 'react-native-paper';
import helpers from '../Helper';
import { TextInput, Button, Text, HelperText,ActivityIndicator } from 'react-native-paper';
export default function LoginScreen({ navigation }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    const theme = useTheme()
    const signIn = () => {
        setLoggingIn(true)
        auth()
            .signInWithEmailAndPassword(Email, Password)
            .then(r => setLoggingIn(false))
            .catch(error => {
                Alert.alert("Invalid Credentials")
                setLoggingIn(false)
                return;
            })
    }
    //error handling and inputs validation
    useEffect(() => {
        try {
            if (Email.length == 0)
                throw new Error('email cannot be empty')
            if (!helpers.isValidEmail(Email))
                throw new Error('Invaid email format')
            if (Password.length == 0)
                throw new Error('password cannot be empty')
            if (Password.length < 8)
                throw new Error('password must be 8 characters long')
        } catch (error) {
            setError(error.message)
            return;
        }
        //if no error then setting the error state as empty
        setError('')

    }, [Email, Password])
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View style={[styles.logo_container]}>
                        {/* <Image resizeMode='contain' style={styles.logo_image} source={require('../assets/login.png')} /> */}
                        <Text style={{ color: theme.colors.onBackground, marginTop: 20 }} variant='displaySmall'>Welcome Back</Text>
                        <Text style={{ color: theme.colors.onBackground }} variant='bodyLarge'>Enter your credentials</Text>
                    </View>
                    <View style={styles.inputs_container}>
                        <View style={{ width: '100%' }}>
                            {/* <Text style={[textStyles, { marginBottom: 5, marginLeft: 5 }]}>Enter Email</Text> */}
                            <TextInput left={<TextInput.Icon icon='email' />} onChangeText={(newemail) => setEmail(newemail)} value={Email} mode='outlined' label={'Enter Email'} />
                            {
                                error.includes('email') &&
                                <HelperText type='error'>
                                    {error}
                                </HelperText>
                            }
                        </View>
                        <View style={{ width: '100%' }}>
                            {/* <Text style={[textStyles, { marginBottom: 5, marginLeft: 5 }]}>Enter Password</Text> */}
                            <TextInput left={<TextInput.Icon icon='lock' />} secureTextEntry={true} mode='outlined' label={'Enter Password'} onChangeText={setPassword} />
                            {
                                error.includes('password') &&
                                <HelperText type='error'>
                                    {error}
                                </HelperText>
                            }
                        </View>
                        <View style={{ width: '100%' }}>
                            {
                                loggingIn ?
                                    <ActivityIndicator color={theme.colors.onBackground} /> :
                                    <Button disabled={error.length > 0 ? true : false} mode='contained' onPress={signIn}>
                                        Sign in
                                    </Button>
                            }
                            <Text onPress={() => navigation.navigate("SignupScreen")} variant='labelLarge' style={{ textAlign: 'center', marginTop: 20 }}>
                                Don`t have an account
                                <Text style={{ color: theme.colors.primary }} variant='labelLarge'> SignUp</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </View >
        </ScrollView >

    )
}
const styles = StyleSheet.create({

    logo_container: {
        flex: 0.5,
        color: 'white',
        marginBottom: 40,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    logo_image: { width: 120, height: 120 },
    inputs_container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 0.5,
        gap: 20,
        padding: 20
    }
})