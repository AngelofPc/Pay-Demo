import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screens/auth/SplashScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginScreen from '../screens/auth/LoginScreen';
// import PhoneVerificationScreen from '../screens/auth/PhoneVerificationScreen';
import TransactionPinScreen from '../screens/auth/TransactionPinScreen';
// import Timer from '../screens/auth/Timer';

const AuthStack = createStackNavigator();

const navigationOptions = {
  headerShown: false,

  // headerTintColor: '#fff',
  // headerTitleStyle: {
  // fontWeight: 'bold',
  // },
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={navigationOptions}
      />
      {/* <AuthStack.Screen
        name="Timer"
        component={Timer}
        options={navigationOptions}
      /> */}
      <AuthStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={navigationOptions}
      />
      <AuthStack.Screen
        name="TransactionPinScreen"
        component={TransactionPinScreen}
        options={navigationOptions}
      />
      {/* <AuthStack.Screen
        name="PhoneVerificationScreen"
        component={PhoneVerificationScreen}
        options={navigationOptions}
      /> */}
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={navigationOptions}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
