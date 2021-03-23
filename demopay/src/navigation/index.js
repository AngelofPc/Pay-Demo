import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './_authNavigator';
import AppNavigator from './_appNavigator';

// import DashboardNavigator from './_dashboardNavigator';
// import SplashScreen from '../screens/SplashScreen';

// import OnboardingNavigator from '../navigation/_onboardingNavigator';
// import CashMeNavigator from './_cashMeNavigator';
// import CashXNavigator from './_cashXNavigator';
// import BillPaymentNavigator from './_billPaymentsNavigator';

import {navigationRef} from '../helpers/navigationRefs';

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
  const [token, setToken] = React.useState(null);

  const check = async () => {
    const re = await AsyncStorage.getItem('token');
    // console.log(re, 're');
    // setToken(re);
    // return re;
  };

  check();
  // console.log(token);
  return (
    <NavigationContainer ref={navigationRef}>
      <DemoPayStack.Navigator>
        {/* {!token && ( */}
        <DemoPayStack.Screen
          name="Auth"
          component={AuthNavigator}
          options={navigationOptions}
        />
        {/* )} */}

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
