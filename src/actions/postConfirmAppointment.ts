// import {CustomerIO} from 'customerio-reactnative';
import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: number;
  appointmentDetails: any;
};

export const postConfirmAppointment =
  ({appId, appointmentDetails}: args) =>
  dispatch => {
    try {
      api
        .postAuthorizedFormData('wx.appointment/confirm-app', {appId})
        .then(res => {
          if (res['internal-code'] === 200) {
            // CustomerIO.track('confirm-appointment', {
            //   ...appointmentDetails,
            //   appointmentID: appId,
            // });
            dispatch({
              type: REDUCER.POST_CONFIRM_APPOINTMENT_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_CONFIRM_APPOINTMENT_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_CONFIRM_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };

export function postConfirmAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.POST_CONFIRM_APPOINTMENT_LOADING});
}
