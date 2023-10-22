import auth from '@react-native-firebase/auth';
import React from 'react';
import { View } from 'react-native';
import { AnimatedFAB, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
// spacing variables
const _spacing = 20;
const _size = 20;
const _FABSpacing = 20;

export default function HomeScreen({ navigation }) {
  const theme = useTheme();
  const currentUser = auth().currentUser;
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>

      <AnimatedFAB
        icon={'plus'}
        label={'add'}
        onPress={() => navigation.navigate("AddInfoScreen")}
        visible={true}
        style={{ position: 'absolute', bottom: _FABSpacing, right: _FABSpacing }}
      />
      <View
        style={{
          backgroundColor: theme.colors.primaryContainer,
          padding: _spacing,
          flex: 0.15,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: _spacing,
          }}>
          <Icon
            name="calendar"
            color={theme.colors.onPrimaryContainer}
            size={_size}
          />
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onPrimaryContainer }}>
            {month + '-' + year + '  '}
            <Text variant="titleMedium">Balance</Text>
          </Text>
        </View>
        <View>
          <Text variant="titleLarge" style={{ paddingVertical: 10 }}>Summary: + 5000Rs</Text>
        </View>
      </View>
    </View>
  );
}
