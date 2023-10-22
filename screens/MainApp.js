import auth from '@react-native-firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { darkTheme, lightTheme } from '../utils/PaperColorTheme';
import { ThemeContext } from '../utils/ThemeProvider';
import AuthScreens from './AuthScreens';
import MiddlewareScreen from './MiddlewareScreen';
const MainApp = () => {
    const { userTheme, setuserTheme, userPreference, setUserPreference } = useContext(ThemeContext)
    const currentSystemTheme = useColorScheme()
    const currentTheme = userPreference == 'system' ? currentSystemTheme : userTheme
    SystemNavigationBar.setNavigationColor(currentTheme == 'dark' ? 'black' : 'white').then(() => console.log('color is set'));
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    return (
        <PaperProvider theme={currentTheme == 'dark' ? darkTheme : lightTheme} settings={{ rippleEffectEnabled: false }}>
            <View style={{ flex: 1 }}>
                {user ? <MiddlewareScreen /> : <AuthScreens />}
            </View>
        </PaperProvider>
    );
}

export default MainApp;
