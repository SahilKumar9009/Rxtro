import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null
}

export const getFilterRepresentative = ({drugRepId}: args) => dispatch => {
  try {
   api.getAuthorized('wx.representative/get-drug-representative-filter', {drugRepId: drugRepId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_FILTER_REPRESENTAIVE_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_FILTER_REPRESENTAIVE_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.GET_FILTER_REPRESENTAIVE_FAILED,
      payload: error,
    });
  }
};

export function getFilterRepresentativeLoading() {
  return dispatch => dispatch({type: REDUCER.GET_FILTER_REPRESENTAIVE_LOADING});
}