import axios from 'axios';
import {API_BASE_URL, EMAIL_ID, PASSWORD, REDUCER} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

type args = {
  appId: number;
  attendantsIds: number[];
  doctorsAccurate: number;
  repComment: string;
};

export const postCompleteAppointment =
  ({appId, attendantsIds, doctorsAccurate, repComment}: args) =>
  async dispatch => {
    try {
      const username = await AsyncStorage.getItem(EMAIL_ID);
      const password = await AsyncStorage.getItem(PASSWORD);

      if (username && password) {
        const response = await axios.post(
          API_BASE_URL +
            `/wx.appointment/complete-app?appId=${appId}&attendantsIds=${attendantsIds}&doctorsAccurate=${doctorsAccurate}&repComment=${repComment}`,
          undefined,
          {
            auth: {
              username,
              password,
            },
          },
        );
        const res = response.data;
        if (res['internal-code'] === 200) {
          dispatch({
            type: REDUCER.POST_COMPLETE_APPOINTMENT_SUCCESS,
            payload: res,
          });
        } else {
          dispatch({
            type: REDUCER.POST_COMPLETE_APPOINTMENT_FAIL,
            payload: res,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: REDUCER.POST_COMPLETE_APPOINTMENT_FAIL,
        payload: error,
      });
    }
  };
