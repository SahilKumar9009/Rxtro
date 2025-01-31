import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null, 
  regionId: number
}

export const getSuburbFilter = ({drugRepId, regionId}:args) => dispatch => {
  try {
    api.getAuthorized('wx.suburb/get-suburb-filter-by-region', {drugRepId: drugRepId, regionId: regionId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_SUBURB_FILTER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.GET_SUBURB_FILTER_FAILED,
          payload: res,
        })
      }
    })
  } catch (error) {
    dispatch({
      type: REDUCER.GET_SUBURB_FILTER_FAILED,
      payload: error,
    })
  }
}

export function getSuburbFilterLoading() {
  return dispatch => dispatch({type: REDUCER.GET_SUBURB_FILTER_LOADING});
}


