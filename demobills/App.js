/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';

import DemoPayNavigator from './src/navigation';
import {Provider as AppProvider} from './src/context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <DemoPayNavigator />
    </AppProvider>
  );
};

export default App;
