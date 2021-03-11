import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// import SplashScreen from '../screens/SplashScreen';

// import OnboardingNavigator from '../navigation/_onboardingNavigator';
import AuthNavigator from './_authNavigator';
// import DashboardNavigator from './_dashboardNavigator';
import AppNavigator from './_appNavigator';

// import CashMeNavigator from './_cashMeNavigator';
// import CashXNavigator from './_cashXNavigator';
// import BillPaymentNavigator from './_billPaymentsNavigator';

import Fonts from '../styles/Fonts';
import {Icon} from 'react-native-elements';

const DemoPayStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const navigationOptions = {
  headerShown: false,
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },

  headerShown: false,
  // tabBarVisible: false,
};

const GiroNavigator = () => {
  return (
    <NavigationContainer>
      <DemoPayStack.Navigator>
        <DemoPayStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={navigationOptions}
        />

        <DemoPayStack.Screen
          name="App"
          component={AppNavigator}
          options={navigationOptions}
        />
        {/* 
        
        <DemoPayStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={navigationOptions}
        /> */}
      </DemoPayStack.Navigator>
    </NavigationContainer>
  );
};

export default GiroNavigator;
