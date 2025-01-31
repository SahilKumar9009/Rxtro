import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: number
}

export const getAppointmentInfo = ({appId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.appointment/get-app-info', {appId: appId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_APPOINTMENT_INFO_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_APPOINTMENT_INFO_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_APPOINTMENT_INFO_FAILED,
      payload: error,
    });
  }
};

export function getAppointmentInfoLoading() {
  return dispatch => dispatch({type: REDUCER.GET_APPOINTMENT_INFO_LOADING});
}