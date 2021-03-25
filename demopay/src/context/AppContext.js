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
        ...state,
        token: action.payload,
        balance: action.balance,
        transactions: action.transactions,
        username: action.username,
        wallet_id: action.wallet_id,
      };

    case 'fund_wallet':
      return {
        ...state,
        balance: action.balance,
        transaction_ref: action.transaction_ref,
      };

    case 'transfer':
      return {
        ...state,
        transfer: action.payload,
        balance: action.balance,
        transactions: action.transactions,
      };

    case 'balance':
      return {
        ...state,
        transfer: action.payload,
        balance: action.balance,
        transactions: action.transactions,
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

const register = (dispatch) => async ({username, email, wallet, password}) => {
  try {
    dispatch({type: 'clear_response'});
    setIsSending(dispatch, true);

    if (username === '' || wallet === '' || password === '' || email === '') {
      dispatch({
        type: 'set_response',
        status: false,
        kind: 'error',
        payload: 'All fields are required!',
      });
      return setIsSending(dispatch, false);
    }

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('username');
    // await AsyncStorage.setItem('token', loginRes.data.session_token);
    const res = await trackerApi.post('register', {
      username,
      email,
      wallet_id: wallet,
      password,
    });

    console.log(res.data, res.status, 'sasas');

    setIsSending(dispatch, false);
    if (res.status === 200) {
      const loginRes = await trackerApi.post('login', {
        wallet_id: wallet,
        password,
      });

      if (loginRes.status === 200) {
        console.log(loginRes.data, loginRes.status);
        await AsyncStorage.setItem('token', loginRes.data.session_token);
        await AsyncStorage.setItem('username', loginRes.data.username);
      } else {
        console.log(loginRes.data, loginRes.status);
      }

      dispatch({
        type: 'login',
        payload: loginRes.data.session_token,
        balance: loginRes.data.wallet_bal,
        transactions: loginRes.data.transactions,
        username: loginRes.data.username,
        wallet_id: loginRes.data.wallet_id,
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

    console.log(error.response, 'register');
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

    console.log(res.data, 'lol');
    if (res.status === 200) {
      await AsyncStorage.setItem('token', res.data.session_token);
      await AsyncStorage.setItem('username', res.data.username);

      dispatch({
        type: 'login',
        payload: res.data.session_token,
        balance: res.data.wallet_bal,
        transactions: res.data.transactions,
        username: res.data.username,
        wallet_id: res.data.wallet_id,
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

    if (error.response.status === 404) {
      return dispatch({
        type: 'set_response',
        status: false,
        kind: 'error',
        payload: 'Account does not exist',
      });
    }

    dispatch({
      type: 'set_response',
      status: false,
      kind: 'error',
      payload: error.response.data,
    });
    console.log(error.response.data, 'login');
  }
};

const sendFcmToken = (dispatch) => async ({fcmToken}) => {
  dispatch({type: 'clear_response'});
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

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const fundWallet = (dispatch) => async ({amount}) => {
  dispatch({type: 'clear_response'});
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

    const res = await trackerApi.get(
      `transaction-summary/${sort}/${wallet}/${amount}`,
    );
    // const res = await trackerApi.get(`wallet/${sort}/${wallet}/${amount}`);

    if (res.status === 200) {
      if (!res.data.found) {
        setIsSending(dispatch, false);
        return dispatch({
          type: 'set_response',
          status: false,
          kind: 'error',
          payload: 'Wallet does not exist!',
        });
        // RootNavigation.navigate('SummaryScreen')
      } else {
        RootNavigation.navigate('SummaryScreen', {
          action: 'transfer',
          data: res.data,
          amount,
          walletName,
          sort,
        });
      }
    }
    setIsSending(dispatch, false);
  } catch (error) {
    setIsSending(dispatch, false);
    console.log(error.response);
  }
};

const transfer = (dispatch) => async ({
  wallet,
  sort,
  amount,
  username,
  data,
}) => {
  setIsSending(dispatch, true);
  dispatch({type: 'clear_response'});

  try {
    const res = await trackerApi.post('transfer', {
      wallet_id: wallet,
      wallet_sort_code: sort,
      amount,
      recipient: data,
    });

    dispatch({
      type: 'transfer',
      payload: res.data.transaction,
      balance: res.data.wallet_bal,
      transactions: res.data.transactions,
    });

    console.log(res.data);
    dispatch({
      type: 'set_response',
      status: true,
      kind: 'success',
      payload: res.data.response,
    });

    RootNavigation.navigate('SuccessScreen', {
      action: 'transfer',
      amount,
      username,
    });
    setIsSending(dispatch, false);
  } catch (error) {
    console.log(error.response);
    setIsSending(dispatch, false);
  }
};

const balance = (dispatch) => async ({transaction, balance, transactions}) => {
  dispatch({type: 'clear_response'});
  1;
  dispatch({
    type: 'balance',
    payload: transaction,
    balance: balance,
    transactions: transactions,
  });
};

const sendAmount = (dispatch) => async ({amount, balance}) => {
  dispatch({type: 'clear_response'});
  setIsSending(dispatch, true);

  if (amount > balance) {
    dispatch({
      type: 'set_response',
      status: false,
      kind: 'error',
      payload: 'Insucfficient Balance!',
    });
    return setIsSending(dispatch, false);
  }

  setIsSending(dispatch, false);
  RootNavigation.navigate('AccountScreen', {amount});
};

const withdraw = (dispatch) => async ({amount, balance, action}) => {
  dispatch({type: 'clear_response'});
  setIsSending(dispatch, true);

  if (amount > balance) {
    dispatch({
      type: 'set_response',
      status: false,
      kind: 'error',
      payload: 'Insucfficient Balance!',
    });
    return setIsSending(dispatch, false);
  }

  setIsSending(dispatch, false);
  RootNavigation.navigate('AccountScreen', {amount, action});
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
  await AsyncStorage.removeItem('userId');
  await AsyncStorage.removeItem('userRole');
  await AsyncStorage.removeItem('user');
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
    transfer,
    withdraw,
    sendAmount,
    signout,
    balance,
    clearResponse,
    tryLocalSignin,
  },
  {token: null, response: {}, isSending: false},
);
