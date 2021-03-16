import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
  baseURL: 'http://demobills.sandbox.giroct.com/app/',
  // baseURL: 'https://randomuser.me/api/',
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'multipart/form-data; ',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;

// exports.instance;
