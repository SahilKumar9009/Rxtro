import AsyncStorage from '@react-native-async-storage/async-storage';
import {putLogout} from '../../actions';
import {removeTokens} from '../tokens';
import {DEVICE_ID} from '../../constants';
import {CustomerIO} from 'customerio-reactnative';
import navigateTo from '../../navigation/navigate';
import configureStore from '../../store';
const {store} = configureStore();

export const logout = async () => {
  const deviceId = await AsyncStorage.getItem(DEVICE_ID);
  store.dispatch(putLogout({deviceId: deviceId}));
  await AsyncStorage.removeItem(DEVICE_ID);
  removeTokens();
  await AsyncStorage.removeItem(DEVICE_ID);
  await AsyncStorage.removeItem('USER_PROFILE');
  CustomerIO.clearIdentify();
  AsyncStorage.removeItem('CustomerIOIdentification');
  navigateTo('LoginScreen', {}, true);
};
