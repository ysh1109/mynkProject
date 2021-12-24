// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator,TransitionSpecs} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen.js';
import LoginScreen from '../screens/LoginScreen.js';
import HomeScreen from '../screens/HomeScreen.js';
import SignUpScreen from '../screens/SignUpScreen.js';
import DescScreen from '../screens/DescScreen.js';
const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      
      screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen  name="Spalsh" component={SplashScreen} />
      
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Desc" component={DescScreen}/>
    </Stack.Navigator>
  );
};

export default StackNavigation;
