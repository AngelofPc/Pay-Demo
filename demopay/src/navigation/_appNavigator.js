import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/app/HomeScreen';
import AccountScreen from '../screens/app/AccountScreen';
import SummaryScreen from '../screens/app/SummaryScreen';
import SuccessScreen from '../screens/app/SuccessScreen';
import PinScreen from '../screens/app/PinScreen';
import FundAmountScreen from '../screens/app/FundAmountScreen';

const WalletStack = createStackNavigator();

const navigationOptions = {
  headerShown: false,
  tabBarVisible: true,
};

const navigationHideOptions = {
  headerShown: false,
  tabBarVisible: false,
};

const AuthNavigator = () => {
  return (
    <WalletStack.Navigator>
      <WalletStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={navigationOptions}
      />
      <WalletStack.Screen
        name="FundAmountScreen"
        component={FundAmountScreen}
        options={navigationOptions}
      />
      <WalletStack.Screen
        name="PinScreen"
        component={PinScreen}
        options={navigationOptions}
      />
      <WalletStack.Screen
        name="SummaryScreen"
        component={SummaryScreen}
        options={navigationOptions}
      />
      <WalletStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={navigationOptions}
      />
      <WalletStack.Screen
        name="SuccessScreen"
        component={SuccessScreen}
        options={navigationOptions}
      />
    </WalletStack.Navigator>
  );
};

export default AuthNavigator;
