import api from '../api';
import {REDUCER} from '../constants';

type args = {
  appId: number, 
  sizeResult: number
}

export const postShowSwapAppointment = ({appId, sizeResult}: args) => dispatch => {
  try {
    api.postAuthorizedFormData('wx.appointment/show-swap-app', {appId: appId, sizeResult: sizeResult}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.POST_SHOW_SWAP_APPOINTMENT_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.POST_SHOW_SWAP_APPOINTMENT_FAILED,
          payload: res 
    }) 
  } 
})
  } catch(error) {
    dispatch({
      type: REDUCER.POST_SHOW_SWAP_APPOINTMENT_FAILED,
      payload: error,
    });
  }
};

export function postShowSwapAppointmentLoading() {
  return dispatch => dispatch({type: REDUCER.POST_SHOW_SWAP_APPOINTMENT_LOADING});
}