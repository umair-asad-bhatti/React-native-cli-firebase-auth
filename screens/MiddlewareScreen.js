
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmailVerificationScreen from './EmailVerificationScreen';
import MainScreens from './MainScreens';
import { useTheme } from 'react-native-paper';
import AddInfoScreen from './AddInfoScreen';
import { StatusBar } from 'react-native'
const Stack = createNativeStackNavigator();

export default function MiddlewareScreen() {
    const theme = useTheme()
    return (
        <>
            <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} backgroundColor={theme.colors.background} />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="EmailVerificationScreen" component={EmailVerificationScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MainScreens" component={MainScreens} options={{ headerShown: false }} />
                    <Stack.Screen name="AddInfoScreen" component={AddInfoScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}