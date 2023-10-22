import { View, Text, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { React, useState } from 'react'
import { useTheme } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
export default function SignUpScreen({ navigation }) {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Confirmpassword, setConfirmpassword] = useState('')
    const [Username, setUsername] = useState('')
    const [signingUp, setSigningUp] = useState(false)
    const theme = useTheme()
    const signUp = () => {
        if (Email.length == 0 || Password.length == 0 || Username.length == 0 || Confirmpassword.length == 0) {
            Alert.alert('email or password cannot be empty')
            return;
        }
        if (Password != Confirmpassword) {
            Alert.alert('password must match')
            return;
        }

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
                        <Image resizeMode='contain' style={styles.logo_image} source={require('../assets/signup.png')} />
                        <Text style={{ marginTop: 20, fontSize: 25, color: theme.colors.primary }}>User SignUp</Text>
                    </View>
                    <View style={styles.inputs_container}>
                        <View style={styles.input_view}>
                            <TextInput value={Username} onChangeText={setUsername} left={<TextInput.Icon icon='account' />} mode='outlined' label={'Enter UserName'} />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput left={<TextInput.Icon icon='email' />} onChangeText={setEmail} value={Email} mode='outlined' label={'Enter Email'} />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput value={Password} onChangeText={setPassword} left={<TextInput.Icon icon='lock' />} secureTextEntry={true} mode='outlined' label={'Enter Password'} />
                        </View>
                        <View style={styles.input_view}>
                            <TextInput left={<TextInput.Icon icon="lock-check" />} secureTextEntry={true} mode='outlined' label={'Confirm Password'} value={Confirmpassword} onChangeText={setConfirmpassword} />
                        </View>

                        <View style={styles.input_view}>
                            {
                                signingUp ?
                                    <ActivityIndicator color={theme.colors.onBackground} /> :
                                    <Button mode='contained' onPress={signUp}>
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
        flex: 0.6,
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