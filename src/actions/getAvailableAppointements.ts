import api from '../api';
import {REDUCER, ScreenNames} from '../constants';
import navigateTo from '../navigation/navigate';

type args = {
  drugRepId: string | null,
  territoryId: null
}


export const getAvailableAppointments = ({drugRepId, territoryId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.appointment/get-available-app-by-territory', {drugRepId: drugRepId, pageNumber: 1, totalPerPage: 10, territoryId: territoryId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_AVAILABLE_APPOINTMENTS_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_AVAILABLE_APPOINTMENTS_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    console.log("in the error", error)
    dispatch({
      type: REDUCER.GET_AVAILABLE_APPOINTMENTS_FAILED,
      payload: error,
    });
    navigateTo(ScreenNames.MYCUSTOMER);
  }
};

export function getAvailableAppointmentsLoading() {
  return dispatch => dispatch({type: REDUCER.GET_AVAILABLE_APPOINTMENTS_LOADING});
}