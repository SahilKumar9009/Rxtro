import api from '../api';
import {REDUCER} from '../constants';

export const getStateFilter = () => dispatch => {
  try {
   api.getAuthorized('wx.territory/get-state-filter').then(res => {
      if (res) {
        dispatch({
          type: REDUCER.GET_STATE_FILTER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.GET_STATE_FILTER_FAILED,
          payload: res,
        })
      }
    })

  } catch (error) {
    dispatch({
      type: REDUCER.GET_STATE_FILTER_FAILED,
      payload: error,
    })
  }
}

export function getStateFilterLoading() {
  return dispatch => dispatch({type: REDUCER.GET_STATE_FILTER_LOADING});
}

