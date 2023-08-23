import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignInScreen from './SignInScreen';
import Main from './Main';
import AboutScreen from './AboutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }}/>
        <Stack.Screen name="Signup" component={SignInScreen} options={{ title: '' }}/>
        <Stack.Screen name="About" component={AboutScreen} options={{ title: '' }}/>
        <Stack.Screen name="Main" component={Main} options={{ title: '' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
