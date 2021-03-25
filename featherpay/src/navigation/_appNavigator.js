import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/app/HomeScreen';
import AccountScreen from '../screens/app/AccountScreen';
import SummaryScreen from '../screens/app/SummaryScreen';
import NotificationScreen from '../screens/app/NotificationScreen';
import SuccessScreen from '../screens/app/SuccessScreen';
import PinScreen from '../screens/app/PinScreen';
import FundAmountScreen from '../screens/app/FundAmountScreen';

import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const WalletStack = createStackNavigator();

const navigationOptions = {
  headerShown: false,
  tabBarVisible: true,
};

const navigationHideOptions = {
  headerShown: false,
  tabBarVisible: false,
};

const AppNavigator = () => {
  const navigation = useNavigation();
  const [initialRoute, setInitialRoute] = React.useState('Auth');
  React.useEffect(() => {
    // requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
        [
          {
            text: 'OK',
            onPress: async () => {
              navigation.navigate('NotificationScreen', {
                data: remoteMessage.data,
                // transaction: remoteMessage.transaction,
              });
              () => null;
            },
          },
        ],
      );
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('NotificationScreen', {data: remoteMessage.data});
      () => null;
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            [
              {
                text: 'OK',
                onPress: async () => {},
              },
            ],
          );
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute('NotificationScreen', {data: remoteMessage.data}); // e.g. "Settings"
        }
        // setLoading(false);
      });

    // return unsubscribe;
  }, []);

  return (
    <WalletStack.Navigator initialRouteName={initialRoute}>
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
        name="NotificationScreen"
        component={NotificationScreen}
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

export default AppNavigator;
