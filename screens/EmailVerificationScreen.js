import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import auth from '@react-native-firebase/auth'
import { Button } from 'react-native';
export default function EmailVerificationScreen({ navigation }) {


    const [user, setUser] = useState(auth().currentUser)//getting the updated user stats to check the email verification
    useEffect(() => {
        //if email is already verified navigate to main screens
        if (user?.emailVerified) {
            navigation.replace("MainScreens")
            return;
        }
        //periodically checking if email is verified
        auth().currentUser?.reload().then(() => {
            setUser(auth().currentUser)
            if (user.emailVerified) {
                navigation.replace("MainScreens")
            }
        })
    }, [user])
    if (!user.emailVerified) {
        return (
            <View>
                <Text style={[{ fontSize: 25, padding: 20 }]}>Email verification is required....</Text>
                <Button onPress={() => {
                    user?.sendEmailVerification()
                }} title='send verification email'></Button>
            </View>
        );
    }

}

