import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function EmailVerificationScreen({ navigation }) {
  const theme = useTheme()
  const [user, setUser] = useState(auth().currentUser);
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const startTimer = () => {
    setTimer(120);
    setIsButtonDisabled(true);

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setIsButtonDisabled(false);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };
  //if email is already verified navigate to main screens
  useEffect(() => {
    if (user?.emailVerified) {
      navigation.replace('MainScreens');
      return;
    }

    // Periodically check if email is verified
    auth()
      .currentUser?.reload()
      .then(() => {
        setUser(auth().currentUser);
        if (user.emailVerified) {
          navigation.replace('MainScreens');
        }
      });
  }, [user]);

  if (!user.emailVerified)
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: theme.colors.background, flex: 1 }}>
        <View>
          <Image style={{ width: 300, height: 300 }} source={require('../assets/email.png')} />
        </View>
        <Text variant='titleLarge' style={{ color: theme.colors.primary, padding: 20, alignItems: 'center' }}>
          Please Verify Your Email
        </Text>
        <Button
          style={{ marginTop: 30 }}
          mode="contained"
          onPress={() => {
            user?.sendEmailVerification();
            startTimer();
          }}
          disabled={isButtonDisabled}
          contentStyle={{
            backgroundColor: isButtonDisabled ? 'gray' : theme.colors.primary,
          }}
          labelStyle={{
            color: 'white',
          }}
        >
          {isButtonDisabled ? `Resend in ${timer} seconds` : 'Send Email Link '}
        </Button>
        {
          isButtonDisabled &&
          <View style={{ flex: 1 }}>
            <Text style={{ marginTop: 20, alignItems: 'center', textAlign: 'center' }}>Email has been sent to</Text>
            <Text style={{ alignItems: 'center', textAlign: 'center' }}>{user.email}</Text>
          </View>
        }
      </View>
    );
}
