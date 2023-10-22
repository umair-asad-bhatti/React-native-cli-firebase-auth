import { View, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { useTheme } from 'react-native-paper';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
export default function LoginScreen({ navigation }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [loggingIn, setLoggingIn] = useState(false)
    const theme = useTheme()
    const signIn = () => {
        if (Email.length == 0 || Password.length == 0) {
            Alert.alert('email or password cannot be empty')
            return;
        }
        setLoggingIn(true)
        try {
            auth()
                .signInWithEmailAndPassword(Email, Password)
                .then(r => setLoggingIn(false))
                .catch(error => { Alert.alert(error.message); setLoggingIn(false) })
        } catch (error) {
            console.log('error');
        }

    }
    return (
        <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                    <View style={[styles.logo_container]}>
                        <Image resizeMode='contain' style={styles.logo_image} source={require('../assets/login.png')} />
                        <Text style={{ color: theme.colors.primary, marginTop: 20 }} variant='displayMedium'>SignIn</Text>
                    </View>
                    <View style={styles.inputs_container}>
                        <View style={styles.input_view}>
                            {/* <Text style={[textStyles, { marginBottom: 5, marginLeft: 5 }]}>Enter Email</Text> */}
                            <TextInput left={<TextInput.Icon icon='email' />} onChangeText={setEmail} value={Email} mode='outlined' label={'Enter Email'} />
                        </View>
                        <View style={styles.input_view}>
                            {/* <Text style={[textStyles, { marginBottom: 5, marginLeft: 5 }]}>Enter Password</Text> */}
                            <TextInput left={<TextInput.Icon icon='lock' />} secureTextEntry={true} mode='outlined' label={'Enter Password'} onChangeText={setPassword} />

                        </View>
                        <View style={styles.input_view}>
                            {
                                loggingIn ?
                                    <ActivityIndicator color={theme.colors.onBackground} /> :
                                    <Button mode='contained' onPress={signIn}>
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

    },
    input_view: {
        width: '90%',
        // backgroundColor:'red'
    },
    input: {
        borderRadius: 10,
        width: '100%',

        paddingVertical: 6,
        paddingHorizontal: 10
    },
    button: {
        padding: 1,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
        width: '100%',
    },
    button_text: {
        fontSize: 18,
        textAlign: 'center'
    }

})