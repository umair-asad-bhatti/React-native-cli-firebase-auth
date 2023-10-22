import React, { useEffect } from 'react'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import { useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CategoryScreen from './CategoryScreen';

const Tab = createMaterialBottomTabNavigator();
export default function MainScreens() {
    const theme = useTheme()
    return (
        <Tab.Navigator   shifting={false} activeColor={theme.colors.primary} labeled={true} barStyle={{ backgroundColor: theme.colors.background }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
                title: 'Home',
                tabBarIcon: () => <Icon name="home" color={theme.colors.onBackground} size={24} />
            }} />

            <Tab.Screen name="CategoryScreen" component={CategoryScreen} options={{
                title: 'Category',
                tabBarIcon: () => <Icon name="category" color={theme.colors.onBackground} size={24} />
            }} />

            <Tab.Screen name="Settings" component={SettingsScreen} options={{

                title: 'Settings',
                tabBarIcon: () => <Icon name="settings" color={theme.colors.onBackground} size={24} />
            }} />
        </Tab.Navigator>

    )
}