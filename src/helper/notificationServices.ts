import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {FCM_TOKEN} from '../constants';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import notifee from '@notifee/react-native';
import {
  getManufacturer,
  getAndroidId,
  getDeviceId,
} from 'react-native-device-info';

export default async () => {
  await requestPermission();
  const deviceId = Platform.OS === 'ios' ? getDeviceId() : await getAndroidId();
  const deviceManufacturer = await getManufacturer();
  const deviceType = `${Platform.OS}-${deviceManufacturer}`;
  try {
    const fcmToken = await messaging().getToken();
    return {deviceId, deviceType, fcmToken};
  } catch (error: any) {
    return {deviceId, deviceType, fcmToken: null};
  }
};

export const requestPermission = async () => {
  let status = false;
  if (Platform.OS === 'android') {
    const statusAndroid = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (statusAndroid === 'granted') {
      status = true;
    }
  } else if (Platform.OS === 'ios') {
    const statusIOS = await messaging().requestPermission();
    if (statusIOS === messaging.AuthorizationStatus.AUTHORIZED) {
      status = true;
    }
  }
  if (status) {
    return;
  }
  // Alert.alert(
  //   'You have not enabled notifications',
  //   'You can continue without it or go to Settings to enable notifications.',
  //   [
  //     {text: 'Continue'},
  //     {
  //       text: 'Go to Settings',
  //       onPress: () => {
  //         Linking.openSettings();
  //       },
  //     },
  //   ],
  // );
};

export async function requestUserPermission() {
  if (Platform.OS === 'android') {
    const statusAndroid = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (statusAndroid !== 'granted') {
      return;
    }
  }
  notifee.requestPermission();
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let checkToken = await AsyncStorage.getItem(FCM_TOKEN);
  if (!checkToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      }
    } catch (error) {
      console.log('error in fcm token', error);
    }
  }
};

export const notificationListener = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background', remoteMessage);
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    console.log('background state', remoteMessage);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log('remote message', remoteMessage);
      }
    });
};
