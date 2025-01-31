import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: string | number | undefined;
  appDateSelected: string | undefined;
};

export const postSwapAppointment =
  ({appId, appDateSelected}: args) =>
  dispatch => {
    try {
      api
        .postAuthorizedFormData('wx.appointment/swap-app', {
          appId,
          appDateSelected,
        })
        .then(res => {
          // console.log('SwapApp', res);
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.POST_SWAP_APPOINTMENT_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_SWAP_APPOINTMENT_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_SWAP_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };

export function postSwapAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.POST_SWAP_APPOINTMENT_LOADING});
}
