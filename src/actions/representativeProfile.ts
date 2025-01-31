import api from '../api';
import {REDUCER} from '../constants';

export const getRepresentativeProfile =
  ({email, password, token, deviceId}) =>
  dispatch => {
    try {
      api
        .get('wx.representative/get-representative-info', {
          email: email,
          password: password,
          token: token,
          deviceId: deviceId,
        })
        .then(res => {
          if (res) {
            if (res['internal-code'] === 200) {
            }
            dispatch({
              type: REDUCER.GET_REPRESENTATIVE_PROFILE_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.GET_REPRESENTATIVE_PROFILE_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_REPRESENTATIVE_PROFILE_FAILED,
        payload: error,
      });
    }
  };
