import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';

// let navigator;

// export const setNavigator = (nav) => {
//   navigator = nav;
// };

// // export const navigate = (route, params) => {
// //   navigator.dispatch(
// //     NavigationActions.navigate({
// //       routeName,
// //       params,
// //     }),
// //   );
// // };

export const isReadyRef = React.createRef();

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

// add other navigation functions that you need and export them
