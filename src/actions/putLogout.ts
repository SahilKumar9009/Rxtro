import api from '../api';
import {REDUCER} from '../constants';

type args = {
  deviceId: string | null 
}

export const putLogout = ({deviceId}: args) =>async dispatch => {
  
  try {
     api.put('wx.representative/logout', {deviceId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.PUT_LOGOUT_SUCCESS,
          payload: res
        })
        return res['internal-code'];
      } else {
        dispatch({
          type: REDUCER.PUT_LOGOUT_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.PUT_LOGOUT_FAILED,
      payload: error,
    });
  }
};

export function putLogoutLoading() {
  return dispatch => dispatch({type: REDUCER.PUT_LOGOUT_LOADING});
}