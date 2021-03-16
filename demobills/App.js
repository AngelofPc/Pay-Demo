/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useContext} from 'react';

import DemoPayNavigator from './src/navigation';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import {Provider as AppProvider} from './src/context/AppContext';

const App = () => {
  useEffect(() => {
    // requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
          );
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    // return unsubscribe;
  }, []);

  return (
    <AppProvider>
      <DemoPayNavigator />
    </AppProvider>
  );
};

export default App;
