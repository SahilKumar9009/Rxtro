import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import {
  API_BASE_URL,
  DEVICE_ID,
  EMAIL_ID,
  FCM_TOKEN,
  PASSWORD,
  REDUCER,
} from '../constants';
import {getRepresentativeProfile} from './representativeProfile';
import axios from 'axios';
// import {CustomerIO} from 'customerio-reactnative';

type args = {
  drugRepId: string | null;

  email: string;
  portraitImg?: {
    uri: string;
    name: string;
    type: string;
  };
};

export const postEditProfile =
  ({drugRepId, email, portraitImg}: args) =>
  dispatch => {
    try {
      api
        .postFormDataWithImage(
          'wx.representative/edit-profile',
          {},
          {
            drugRepId,
            email,
            portraitImg,
          },
        )
        .then(res => {
          if (res['internal-code'] === 200) {
            // CustomerIO.track('user-profile-edited', {
            //   email: email,
            //   type: 'Profile photo updated',
            // });
            dispatch({
              type: REDUCER.POST_EDIT_PROFILE_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_EDIT_PROFILE_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_EDIT_PROFILE_FAILED,
        payload: error,
      });
    }
  };

export function postEditProfileLoading() {
  return dispatch => dispatch({type: REDUCER.POST_EDIT_PROFILE_LOADING});
}

export const updateProfile = data => async dispatch => {
  const email = await AsyncStorage.getItem(EMAIL_ID);
  const password = await AsyncStorage.getItem(PASSWORD);
  if (!email || !password) {
    // console.log('email password not found postEditProfileLoading');
    return;
  }

  try {
    axios
      .post(
        API_BASE_URL + '/wx.representative/update-representative-info',
        data,
        {
          auth: {
            username: email,
            password,
          },
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(async response => {
        const res = response.data;
        // console.log({res});
        if (res['internal-code'] === 200) {
          CustomerIO.track('user-profile-edited', {
            email: email,
            type: 'Profile attributes updated',
          });
          const deviceId = await AsyncStorage.getItem(DEVICE_ID);
          const token = await AsyncStorage.getItem(FCM_TOKEN);
          dispatch(
            getRepresentativeProfile({
              email: email,
              password: password,
              token: token,
              deviceId: deviceId,
            }),
          );
        } else {
          console.log(
            '### something went wrong with wx.representative/update-representative-info',
            res,
          );
        }
      });
  } catch (error) {
    console.log(
      'something went wrong with wx.representative/update-representative-info',
      error,
    );
  }
};
