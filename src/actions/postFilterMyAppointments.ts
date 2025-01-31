import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null,
  surgeryId: number,
  colleagueDrugRepId: string,
  filterClinic: string | null
}

export const postFilterMyAppointments = ({drugRepId, surgeryId, colleagueDrugRepId, filterClinic}: args) => dispatch => {
  try {
     api.postAuthorizedFormData('wx.appointment/filter-my-apps', {drugRepId, surgeryId, colleagueDrugRepId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.POST_FILTER_MY_APPOINTMENTS_SUCCESS,
          payload: res,
          filterClinic: filterClinic
        })
      } else {
        dispatch({
          type: REDUCER.POST_FILTER_MY_APPOINTMENTS_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.POST_FILTER_MY_APPOINTMENTS_FAILED,
      payload: error,
    });
  }
};

export function postFilterMyAppointmentsLoading() {
  return dispatch => dispatch({type: REDUCER.POST_FILTER_MY_APPOINTMENTS_LOADING});
}