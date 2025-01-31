import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null
}

export const getPreviousLastAppointments = ({drugRepId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.appointment/get-prev-last-apps', {drugRepId: drugRepId}).then(res => {
      if (res['internal-code']) {
        dispatch({
          type: REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_FAILED,
      payload: error,
    });
  }
};

export function getPreviousLastAppointmentsLoading() {
  return dispatch => dispatch({type: REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_LOADING});
}