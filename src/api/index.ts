import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Platform} from 'react-native';
import {API_BASE_URL, EMAIL_ID, PASSWORD} from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  params: {},
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  async postAuthorizedFormData(url: string, params?, body?) {
    try {
      const username = await AsyncStorage.getItem(EMAIL_ID);
      const password = await AsyncStorage.getItem(PASSWORD);
      if (!username || !password) {
        console.log('username password not found postAuthorizedFormData');
        return;
      }
      const res = await axiosInstance.post(`${API_BASE_URL}/${url}`, body, {
        params,
        auth: {
          username,
          password,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async postData(url: string, params?, body?) {
    try {
      const res = await axiosInstance.post(`${API_BASE_URL}/${url}`, body, {
        params,
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async postFormDataWithImage(url: string, params?, body?) {
    try {
      const formData = new FormData();
      if (body.portraitImg) {
        formData.append('portraitImg', {
          uri:
            Platform.OS === 'android'
              ? body.portraitImg.uri
              : body.portraitImg.uri.replace('file://', ''),
          name: body.portraitImg.fileName,
          type: body.portraitImg.type,
        });
      }
      formData.append('drugRepId', body.drugRepId);
      formData.append('firstLineProducts', body.firstLineProducts);
      formData.append('secondLineProducts', body.secondLineProducts);
      formData.append('thirdLineProducts', body.thirdLineProducts);
      formData.append('email', body.email);
      const res = await axiosInstance.post(`${API_BASE_URL}/${url}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async get(url: string, params?) {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/${url}`, {params});
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async put(url: string, params?, body?) {
    try {
      const username = await AsyncStorage.getItem(EMAIL_ID);
      const password = await AsyncStorage.getItem(PASSWORD);
      if (!username || !password) {
        console.log('username password not found put');
        return;
      }
      const res = await axiosInstance.put(`${API_BASE_URL}/${url}`, body, {
        params,
        auth: {
          username,
          password,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  async getAuthorized(url: string, params?) {
    try {
      const username = await AsyncStorage.getItem(EMAIL_ID);
      const password = await AsyncStorage.getItem(PASSWORD);
      console.log('in the username && password', username, password);
      if (!username || !password) {
        console.log('username password not found getAuthorized');
        return;
      }
      console.log(`${API_BASE_URL}/${url}`, params, username, password, 'dats');
      const res = await axiosInstance.get(`${API_BASE_URL}/${url}`, {
        params,
        auth: {
          username,
          password,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
