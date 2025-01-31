// ! DOCS: https://customer.io/docs/sdk/react-native/getting-started/

import {
  CustomerIO,
  CustomerIOEnv,
  Region,
  CustomerioConfig,
  CioLogLevel,
} from 'customerio-reactnative';
import {CUSTOMER_IO} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export const CIOinitialisation = () => {
  const env = new CustomerIOEnv();
  env.siteId = CUSTOMER_IO.SITE_ID;
  env.apiKey = CUSTOMER_IO.API_KEY;
  const data = CIOconfigure();
  CustomerIO.initialize(env, data);
};

const CIOconfigure = () => {
  const data = new CustomerioConfig();
  data.logLevel = CioLogLevel.debug;
  data.autoTrackDeviceAttributes = true;
  data.enableInApp = true;

  return data;
};

export const CIOidentitfy = async (
  email: string,
  fname: string,
  lname: string,
) => {
  CustomerIO.identify(email, {first_name: fname, last_name: lname});
  await registerDevice();
  await AsyncStorage.setItem(
    'CustomerIOIdentification',
    'CustomerIOIdentification',
  );
};

const registerDevice = async () => {
  // Customer.io expects a valid token to send push notifications
  // to the user.
  const token = await messaging().getToken();
  if (token) {
    CustomerIO.registerDeviceToken(token);
  }
};
