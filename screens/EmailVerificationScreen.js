import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native-paper';

export default function EmailVerificationScreen({ navigation }) {
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

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Image style={{ width: 300, height: 300 }} source={require('../assets/email.png')} />
      </View>
      <Text style={{ color: 'black', fontSize: 15, padding: 20, alignItems: 'center' }}>
        Please Verify Your Email
      </Text>
      <Button
        style={{ marginTop: 100 }}
        mode="contained"
        onPress={() => {
          user?.sendEmailVerification();
          startTimer();
        }}
        disabled={isButtonDisabled}
        contentStyle={{
          backgroundColor: isButtonDisabled ? 'gray' : 'blue',
        }}
        labelStyle={{
          color: 'white',
        }}
      >
        {isButtonDisabled ? `Resend in ${timer} seconds` : 'Send Email Link '}
      </Button>
    </View>
  );
}
