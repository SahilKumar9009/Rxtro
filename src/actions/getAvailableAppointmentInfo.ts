import api from '../api';
import {REDUCER} from '../constants';

type args = {
  scheduleId: string,
  appDate: string,
  drugRepId: string | null,
  isSwappable: boolean
}

export const getAvailableAppointmentInfo = ({scheduleId, appDate, drugRepId, isSwappable}: args) => dispatch => {
  try {
   api.getAuthorized('wx.appointment/get-availappt-info', {scheduleId, appDate, drugRepId, isSwappable}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_FAILED,
      payload: error,
    });
  }
};

export function getAvailableAppointmentInfoLoading() {
  return dispatch => dispatch({type: REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_LOADING});
}