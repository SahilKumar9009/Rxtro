import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null
}

export const getFutureAppointments = ({drugRepId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.appointment/get-future-apps', {drugRepId: drugRepId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_FUTURE_APPOINTMENTS_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_FUTURE_APPOINTMENTS_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_FUTURE_APPOINTMENTS_FAILED,
      payload: error,
    });
  }
};

export function getFutureAppointmentsLoading() {
  return dispatch => dispatch({type: REDUCER.GET_FUTURE_APPOINTMENTS_LOADING});
}