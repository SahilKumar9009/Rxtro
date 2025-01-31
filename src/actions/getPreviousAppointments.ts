import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null;
};

export const getPreviousAppointments =
  ({drugRepId}: args) =>
  dispatch => {
    try {
      api
        .getAuthorized('wx.appointment/get-previous-apps', {
          drugRepId: drugRepId,
        })
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.GET_PREVIOUS_APPOINTMENTS_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.GET_PREVIOUS_APPOINTMENTS_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_PREVIOUS_APPOINTMENTS_FAILED,
        payload: error,
      });
    }
  };

export function getPreviousAppointmentsLoading() {
  return dispatch =>
    dispatch({type: REDUCER.GET_PREVIOUS_APPOINTMENTS_LOADING});
}
