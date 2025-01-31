import {CustomerIO} from 'customerio-reactnative';
import api from '../api';
import {REDUCER} from '../constants';

type args = {
  surgeryId: number;
  drugRepId: string | null;
  scheduleId: number;
  appDate: string;
};

export const postTakeAppointment =
  ({surgeryId, drugRepId, scheduleId, appDate}: args) =>
  dispatch => {
    try {
      const data = {surgeryId, drugRepId, scheduleId, appDate};
      api
        .postAuthorizedFormData('wx.appointment/take-app', {
          surgeryId,
          drugRepId,
          scheduleId,
          appDate,
        })
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.POST_TAKE_APPOINTMENT_SUCCESS,
              payload: res,
            });
            CustomerIO.track('take-appointment', {
              ...data,
            });
          } else {
            dispatch({
              type: REDUCER.POST_TAKE_APPOINTMENT_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_TAKE_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };

export function postTakeAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.POST_TAKE_APPOINTMENT_LOADING});
}
