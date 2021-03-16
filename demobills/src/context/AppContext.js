import createDataContext from './createDataContext';
import * as RootNavigation from '../helpers/navigationRefs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsSending} from '../helpers/helpers';
import trackerApi from '../api/tracker';

const appReducer = (state, action) => {
  switch (action.type) {
    case 'set_response':
      return {
        ...state,
        response: {
          status: action.status,
          kind: action.kind,
          message: action.payload,
        },
      };

    case 'login':
      return {
        token: action.payload,
        balance: action.balance,
        transactions: action.transactions,
      };

    case 'fund_wallet':
      return {
        ...state,
        balance: action.balance,
        transaction_ref: action.transaction_ref,
      };

    case 'change_password':
      return {
        ...state,
      };

    case 'clear_response':
      return {...state, response: {}};

    case 'isSending':
      return {...state, isSending: action.payload || false};

    case 'signout':
      return {
        token: null,

        response: {},
      };

    default:
      return state;
  }
};

// const login = async (walletId, password) => {
//   console.log(walletId, password);

//   try {
//     // const
//     setIsSending(true);

//     if (res.status === 200) {
//       setIsSending(false);
//       await AsyncStorage.setItem('token', res.data.sessionToken);
//       navigation.navigate('App');
//     }
//   } catch (error) {
//     setIsSending(false);
//     console.log(error);
//   }
// };

// const register = async ({username, walletId, password}) => {
//   console.log(username, walletId, password);

//   console.log('asa');

//   try {
//     // const
//     const res = await trackerApi.post('register', {
//       username,
//       wallet_id: walletId,
//       password: password,
//     });

//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

const register = (dispatch) => async ({username, wallet, password}) => {
  try {
    dispatch({type: 'clear_response'});
    setIsSending(dispatch, true);

    if (username === '' || wallet === '' || password === '') {
      dispatch({
        type: 'set_response',
        status: false,
        kind: 'error',
        payload: 'All fields are required!',
      });
      return setIsSending(dispatch, false);
    }

    await AsyncStorage.removeItem('token');
    // await AsyncStorage.setItem('token', loginRes.data.session_token);

    const res = await trackerApi.post('register', {
      username,
      wallet_id: wallet,
      password,
    });

    setIsSending(dispatch, false);
    if (res.status === 200) {
      const loginRes = await trackerApi.post('login', {
        wallet_id: wallet,
        password,
      });
      await AsyncStorage.setItem('token', loginRes.data.session_token);

      dispatch({
        type: 'login',
        payload: loginRes.data.session_token,
        balance: loginRes.data.wallet_bal,
        transactions: loginRes.data.transactions,
      });

      // console.log(state);

      dispatch({type: 'clear_response'});
      setIsSending(dispatch, false);
      RootNavigation.navigate('App');
    } else {
      setIsSending(dispatch, false);
    }
  } catch (error) {
    setIsSending(dispatch, false);
    dispatch({
      type: 'set_response',
      status: false,
      kind: 'error',
      payload: error.response.data,
    });

    console.log(error.response.data);
  }
};

const login = (dispatch) => async ({wallet, password}) => {
  try {
    dispatch({type: 'clear_response'});
    setIsSending(dispatch, true);

    if (wallet === '' || password === '') {
      dispatch({
        type: 'set_response',
        status: false,
        kind: 'error',
        payload: 'All fields are required!',
      });
      return setIsSending(dispatch, false);
    }

    const res = await trackerApi.post('login', {
      wallet_id: wallet,
      password,
    });

    setIsSending(dispatch, false);

    if (res.status === 200) {
      await AsyncStorage.setItem('token', res.data.session_token);

      dispatch({
        type: 'login',
        payload: res.data.session_token,
        balance: res.data.wallet_bal,
        transactions: res.data.transactions,
      });

      // console.log(state);

      dispatch({type: 'clear_response'});
      setIsSending(dispatch, false);
      RootNavigation.navigate('App');
    } else {
      setIsSending(dispatch, false);
    }
  } catch (error) {
    setIsSending(dispatch, false);
    dispatch({
      type: 'set_response',
      status: false,
      kind: 'error',
      payload: 'An Error Occurred',
    });
    console.log(error.response);
  }
};

const sendFcmToken = (dispatch) => async ({fcmToken}) => {
  try {
    const res = await trackerApi.post('fcmtoken', {
      fcm_token: fcmToken,
    });

    // dispatch({
    //   type: 'fcm_token',
    //   status: true,
    //   kind: 'success',
    //   payload: `${firstname} Added Successfully!`,
    // });

    console.log(res.status);
  } catch (error) {
    console.log(error);
  }
};

const fundWallet = (dispatch) => async ({amount}) => {
  setIsSending(dispatch, true);
  try {
    const res = await trackerApi.post('fund-wallet', {
      amount,
    });

    dispatch({
      type: 'fund_wallet',
      payload: res.data.transaction_ref,
      balance: res.data.wallet_bal,
    });

    dispatch({
      type: 'set_response',
      status: true,
      kind: 'success',
      payload: res.data.response,
    });

    RootNavigation.navigate('SuccessScreen', {action: 'fund', amount: amount});
    setIsSending(dispatch, false);
  } catch (error) {
    console.log(error);
    setIsSending(dispatch, false);
  }
};

const fetchUser = (dispatch) => async ({amount, walletName, sort, wallet}) => {
  try {
    dispatch({type: 'clear_response'});
    setIsSending(dispatch, true);

    if (wallet === '' || amount === '' || sort === '') {
      dispatch({
        type: 'set_response',
        status: false,
        kind: 'error',
        payload: 'All fields are required!',
      });
      return setIsSending(dispatch, false);
    }

    const res = await trackerApi.get(`wallet/${sort}/${wallet}`);
    // dispatch({
    //   type: 'fund_wallet',
    //   payload: res.data.transaction_ref,
    //   balance: res.data.wallet_bal,
    // });

    dispatch({
      type: 'set_response',
      status: true,
      kind: 'success',
      payload: res.data.response,
    });

    console.log(res.data);
    if (res.status === 200) {
      RootNavigation.navigate('SummaryScreen', {
        action: 'transfer',
        data: res.data,
        amount,
        walletName,
        sort,
      });
    }
    setIsSending(dispatch, false);
  } catch (error) {
    setIsSending(dispatch, false);
    console.log(error.response);
  }
};

const transfer = (dispatch) => async ({wallet, sort, amount}) => {
  setIsSending(dispatch, true);
  console.log(wallet, sort, amount);
  try {
    const res = await trackerApi.post('transfer', {
      wallet_id: wallet,
      wallet_sort_code: sort,
      amount,
    });

    dispatch({
      type: 'transfer',
      payload: res.data.transaction,
    });

    dispatch({
      type: 'set_response',
      status: true,
      kind: 'success',
      payload: res.data.response,
    });

    RootNavigation.navigate('SuccessScreen', {
      action: 'transfer',
      amount: amount,
    });
    setIsSending(dispatch, false);
  } catch (error) {
    console.log(error.response);
    setIsSending(dispatch, false);
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({
      type: 'login',
      payload: token,
    });
    RootNavigation.navigate('App');
  } else {
    RootNavigation.navigate('Auth');
  }
};

const signout = (dispatch) => async () => {
  RootNavigation.navigate('Auth');
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('balance');
  await AsyncStorage.removeItem('transactions');
  setIsSending(dispatch, false);
  dispatch({type: 'signout'});
};

const clearResponse = (dispatch) => () => {
  dispatch({type: 'clear_response'});
};

export const {Provider, Context} = createDataContext(
  appReducer,
  {
    register,
    login,
    sendFcmToken,
    fundWallet,
    fetchUser,
    signout,
    transfer,
    clearResponse,
    tryLocalSignin,
  },
  {token: null, response: {}, isSending: false},
);
