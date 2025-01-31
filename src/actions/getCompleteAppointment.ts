import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: string | undefined;
};

export const getCompleteAppointment =
  ({appId}: args) =>
  dispatch => {
    try {
      api
        .getAuthorized('wx.appointment/show-complete-app', {appId: appId})
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.GET_COMPLETE_APPOINTMENT_SUCCESS,
              payload: res,
              dispatched: true,
            });
          } else {
            dispatch({
              type: REDUCER.GET_COMPLETE_APPOINTMENT_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_COMPLETE_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };

export function getCompleteAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.GET_COMPLETE_APPOINTMENT_LOADING});
}
