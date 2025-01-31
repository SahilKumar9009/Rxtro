import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
import {StackParams} from '../navigation/StackNavigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import combineReducer from '../reducers';
import {setNotification} from '../actions';

type ReduxState = ReturnType<typeof combineReducer>;
type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>;

const ForegroundHandler = () => {
  const dispatch = useDispatch<TypedDispatch>();
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('recieved in foreground', remoteMessage);
      //! pass the data in notifee and perform action on its click
      // navigateToAppointment(remoteMessage,dispatch,navigation);
      const {notification, messageId} = remoteMessage;
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        id: messageId,
        title: notification?.title,
        body: notification?.body,
        data: remoteMessage.data,
        ios: {
          foregroundPresentationOptions: {
            badge: true,
            sound: true,
            banner: true,
            list: true,
          },
        },
        android: {
          channelId,
        },
      });
    });
    return unsubscribe;
  });
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          navigateToAppointment(detail.notification, dispatch, navigation);
          break;
      }
    });
  }, []);
  useEffect(() => {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      // Check if the user pressed the "Mark as read" action
      if (type === EventType.ACTION_PRESS) {
        navigateToAppointment(detail.notification, dispatch, navigation);
      }
    });
  }, []);
  return null;
};

export default ForegroundHandler;

const navigateToAppointment = (remoteMessage, dispatch, navigation) => {
  if (remoteMessage) {
    dispatch(setNotification(remoteMessage.data));
  }
  navigation.navigate('AppointmentScreen', {
    screen: 'Appointment',
  });
};

// ! when a notification comes dispatch it
// ! from where can notifications come?
// !    1. App active
// !    2. App killed (Tap)

// ! in both cases dispatch notification when user taps on it
// ! get keys from the dispatched notification and dispatch get appointment details action
// ! naviagte in case of phone and show in case of tab the appointment details screen and based on whether user already has this appointment is swappable or not show swap modal
