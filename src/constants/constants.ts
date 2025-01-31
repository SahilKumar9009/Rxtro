import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getCountry} from 'react-native-localize';

export const isTablet = DeviceInfo.isTablet();
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');
export const DIMENSIONS = {
  WINDOW_HEIGHT: Dimensions.get('window').height,
  WINDOW_WIDTH: Dimensions.get('window').width,
};
export const ACCESS_TOKEN = 'accessToken';
const country = 'au'; // !  getCountry().toLowerCase();

// export const API_BASE_URL = `https://${country}.rxtro.com/api/jsonws`;

export const API_BASE_URL = `https://staging.rxtro.com/api/jsonws`;

// export const API_BASE_URL = `https://staging.rxtro.com`;
export const IMAGE_BASE_URL = `https://staging.rxtro.com/ `;
// export const IMAGE_BASE_URL = `https://staging.rxtro.com/api/jsonws`;

// export const API_BASE_URL = 'https://ca.rxtro.com/api/jsonws';
// export const IMAGE_BASE_URL = 'https://ca.rxtro.com';
// export const API_BASE_URL = 'https://staging.rxtro.com/api/jsonws';
// export const IMAGE_BASE_URL = 'https://staging.rxtro.com';

// export const mainBackgroundColor = '#1F6D9C';
export const mainBackgroundColor = '#2B3990';
export const whiteBackgroundcolor = '#F5F7FB';
export const successButtonColor = '#0BB07B';
export const successButtonBorderColor = '#00865A';
export const commonBorderColor = '#D8D8D8';
export const blueColor = '#006CE6';
export const secondaryFontColor = '#8A94A6';
export const DEVICE_TOKEN = 'deviceToken';
export const DEVICE_ID = 'deviceId';
export const FCM_TOKEN = 'fcmToken';
export const USER_ID = 'userId';
export const EMAIL_ID = 'email';
export const PASSWORD = 'password';

export const FONT_SIZE = {
  f3: (screenWidth < screenHeight ? screenWidth : screenHeight) / 100,
  f4: (screenWidth < screenHeight ? screenWidth : screenHeight) / 90,
  f5: (screenWidth < screenHeight ? screenWidth : screenHeight) / 80,
  f6: (screenWidth < screenHeight ? screenWidth : screenHeight) / 70,
  f7: (screenWidth < screenHeight ? screenWidth : screenHeight) / 60,
  f8: (screenWidth < screenHeight ? screenWidth : screenHeight) / 50,
  f9: (screenWidth < screenHeight ? screenWidth : screenHeight) / 40,
  f10: (screenWidth < screenHeight ? screenWidth : screenHeight) / 37.5,
  f11: (screenWidth < screenHeight ? screenWidth : screenHeight) / 34,
  f12: (screenWidth < screenHeight ? screenWidth : screenHeight) / 31,
  f13: (screenWidth < screenHeight ? screenWidth : screenHeight) / 28.5,
  f14: (screenWidth < screenHeight ? screenWidth : screenHeight) / 26,
  f15: (screenWidth < screenHeight ? screenWidth : screenHeight) / 24,
  f16: (screenWidth < screenHeight ? screenWidth : screenHeight) / 23,
  f18: (screenWidth < screenHeight ? screenWidth : screenHeight) / 20,
  f20: (screenWidth < screenHeight ? screenWidth : screenHeight) / 19,
  f22: (screenWidth < screenHeight ? screenWidth : screenHeight) / 17.04,
  f25: (screenWidth < screenHeight ? screenWidth : screenHeight) / 15,
  f30: (screenWidth < screenHeight ? screenWidth : screenHeight) / 12.5,
  f36: (screenWidth < screenHeight ? screenWidth : screenHeight) / 10,
};

export const SPACING = {
  h5: (screenWidth < screenHeight ? screenWidth : screenHeight) / 75,
  h6: (screenWidth < screenHeight ? screenWidth : screenHeight) / 62.5,
  h7: (screenWidth < screenHeight ? screenWidth : screenHeight) / 53.5,
  h8: (screenWidth < screenHeight ? screenWidth : screenHeight) / 46.8,
  h9: (screenWidth < screenHeight ? screenWidth : screenHeight) / 41.6,
  h10: (screenWidth < screenHeight ? screenWidth : screenHeight) / 37.5,
  h15: (screenWidth < screenHeight ? screenWidth : screenHeight) / 25,
  h20: (screenWidth < screenHeight ? screenWidth : screenHeight) / 19,
  h25: (screenWidth < screenHeight ? screenWidth : screenHeight) / 15,
  h30: (screenWidth < screenHeight ? screenWidth : screenHeight) / 12.5,
  h35: (screenWidth < screenHeight ? screenWidth : screenHeight) / 10.9,
  h40: (screenWidth < screenHeight ? screenWidth : screenHeight) / 9.3,
  h50: (screenWidth < screenHeight ? screenWidth : screenHeight) / 7.2,
  h60: (screenWidth < screenHeight ? screenWidth : screenHeight) / 5.1,
  h150: (screenWidth < screenHeight ? screenWidth : screenHeight) / 3.5,
  h200: (screenWidth < screenHeight ? screenWidth : screenHeight) / 3,
  v0: 0,
  v1: (screenHeight > screenWidth ? screenHeight : screenWidth) / 816,
  v2: (screenHeight > screenWidth ? screenHeight : screenWidth) / 406,
  v3: (screenHeight > screenWidth ? screenHeight : screenWidth) / 272,
  v5: (screenHeight > screenWidth ? screenHeight : screenWidth) / 162,
  v6: (screenHeight > screenWidth ? screenHeight : screenWidth) / 135,
  v7: (screenHeight > screenWidth ? screenHeight : screenWidth) / 115,
  v8: (screenHeight > screenWidth ? screenHeight : screenWidth) / 101,
  v9: (screenHeight > screenWidth ? screenHeight : screenWidth) / 90,
  v10: (screenHeight > screenWidth ? screenHeight : screenWidth) / 80,
  v15: (screenHeight > screenWidth ? screenHeight : screenWidth) / 54,
  v18: (screenHeight > screenWidth ? screenHeight : screenWidth) / 46,
  v20: (screenHeight > screenWidth ? screenHeight : screenWidth) / 40,
  v25: (screenHeight > screenWidth ? screenHeight : screenWidth) / 32,
  v30: (screenHeight > screenWidth ? screenHeight : screenWidth) / 27,
  v35: (screenHeight > screenWidth ? screenHeight : screenWidth) / 23,
  v40: (screenHeight > screenWidth ? screenHeight : screenWidth) / 20,
  v45: (screenHeight > screenWidth ? screenHeight : screenWidth) / 18,
  v50: (screenHeight > screenWidth ? screenHeight : screenWidth) / 16.2,
  v60: (screenHeight > screenWidth ? screenHeight : screenWidth) / 13.5,
  v70: (screenHeight > screenWidth ? screenHeight : screenWidth) / 11.6,
  v75: (screenHeight > screenWidth ? screenHeight : screenWidth) / 10.8,
  v80: (screenHeight > screenWidth ? screenHeight : screenWidth) / 10.1,
  v85: (screenHeight > screenWidth ? screenHeight : screenWidth) / 9.6,
  v90: (screenHeight > screenWidth ? screenHeight : screenWidth) / 9.1,
  v100: (screenHeight > screenWidth ? screenHeight : screenWidth) / 8.1,
  v150: (screenHeight > screenWidth ? screenHeight : screenWidth) / 6.075,
  v175: (screenHeight > screenWidth ? screenHeight : screenWidth) / 5.06,
  v200: (screenHeight > screenWidth ? screenHeight : screenWidth) / 4.05,
};

export const WIDTH = {
  w10: (screenWidth < screenHeight ? screenWidth : screenHeight) / 36.0,
  w20: (screenWidth < screenHeight ? screenWidth : screenHeight) / 18.0,
  w25: (screenWidth < screenHeight ? screenWidth : screenHeight) / 14.4,
  w30: (screenWidth < screenHeight ? screenWidth : screenHeight) / 12.4,
  w35: (screenWidth < screenHeight ? screenWidth : screenHeight) / 10.4,
  w50: (screenWidth < screenHeight ? screenWidth : screenHeight) / 7.2,
  w75: (screenWidth < screenHeight ? screenWidth : screenHeight) / 4.48,
  w90: (screenWidth < screenHeight ? screenWidth : screenHeight) / 4.5,
  w100: (screenWidth < screenHeight ? screenWidth : screenHeight) / 3.6,
  w140: (screenWidth < screenHeight ? screenWidth : screenHeight) / 2.57,
  w150: (screenWidth < screenHeight ? screenWidth : screenHeight) / 2.4,
  w200: (screenWidth < screenHeight ? screenWidth : screenHeight) / 1.8,
  w220: (screenWidth < screenHeight ? screenWidth : screenHeight) / 1.6,
  w225: (screenWidth < screenHeight ? screenWidth : screenHeight) / 1.59,
  w300: (screenWidth < screenHeight ? screenWidth : screenHeight) / 1.12,
  wMax: screenWidth < screenHeight ? screenWidth : screenHeight,
};

export const HEIGHT = {
  h10: (screenHeight > screenWidth ? screenHeight : screenWidth) / 55.4,
  h20: (screenHeight > screenWidth ? screenHeight : screenWidth) / 27.7,
  h25: (screenHeight > screenWidth ? screenHeight : screenWidth) / 25.6,
  h35: (screenHeight > screenWidth ? screenHeight : screenWidth) / 18.6,
  h50: (screenHeight > screenWidth ? screenHeight : screenWidth) / 12.8,
  h75: (screenHeight > screenWidth ? screenHeight : screenWidth) / 8.4,
  h90: (screenHeight > screenWidth ? screenHeight : screenWidth) / 7.2,
  h100: (screenHeight > screenWidth ? screenHeight : screenWidth) / 6.4,
  h110: (screenHeight > screenWidth ? screenHeight : screenWidth) / 5.9,
  h120: (screenHeight > screenWidth ? screenHeight : screenWidth) / 5.3,
  h130: (screenHeight > screenWidth ? screenHeight : screenWidth) / 4.9,
  h150: (screenHeight > screenWidth ? screenHeight : screenWidth) / 4.2,
  h200: (screenHeight > screenWidth ? screenHeight : screenWidth) / 3.2,
  h230: (screenHeight > screenWidth ? screenHeight : screenWidth) / 2.7,
  h250: (screenHeight > screenWidth ? screenHeight : screenWidth) / 1.7,
  h270: (screenHeight > screenWidth ? screenHeight : screenWidth) / 1.6,
};

export enum CUSTOMER_IO {
  SITE_ID = '7b3a0ec87934147bbe33',
  API_KEY = '7f14785be2797bfcd856',
}

export const Colors = {
  WHITE: '#ffffff',
  BLACK_TEXT: '#070F37',
  RED_COLOR: 'red',
};

const images = {
  Calendar: require('../assets/calendar.png'),
};



export enum ScreenNames {
 APPOINTMENT =  "Appointment",
 MYCUSTOMER ="My Customer",
 REQUEST ="Request",
 NOTIFICATION="Notifications",
 ADDCLINIC = "Add Clinic"
}