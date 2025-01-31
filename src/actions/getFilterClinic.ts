import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null
}

export const getFilterClinic = ({drugRepId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.surgery/get-clinic-filter', {drugRepId: drugRepId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_FILTER_CLINIC_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_FILTER_CLINIC_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_FILTER_CLINIC_FAILED,
      payload: error,
    });
  }
};

export function getFilterClinicLoading() {
  return dispatch => dispatch({type: REDUCER.GET_FILTER_CLINIC_LOADING});
}