import {CustomerIO} from 'customerio-reactnative';
import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: number;
  appointmentDetails: any;
};

export const postCancelAppointment =
  ({appId, appointmentDetails}: args) =>
  async dispatch => {
    try {
      api
        .postAuthorizedFormData('wx.appointment/cancel-app', {appId})
        .then(res => {
          if (res['internal-code'] === 200) {
            CustomerIO.track('cancel-appointment', {
              appointmentID: appId,
              ...appointmentDetails,
            });
            dispatch({
              type: REDUCER.POST_CANCEL_APPOINTMENT_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_CANCEL_APPOINTMENT_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_CANCEL_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };

export function postCancelAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.POST_CANCEL_APPOINTMENT_LOADING});
}
