
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignupScree';
import { useTheme } from 'react-native-paper';

const Stack = createNativeStackNavigator();

const AuthScreens = () => {
    const theme = useTheme()
    return (
        <>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )

}



export default AuthScreens;
