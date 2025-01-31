import api from '../api';
import {REDUCER} from '../constants';

export const getCompanies = () => dispatch => {
  try {
   api.get('wx.representative/get-company-list').then(res => {
      if (res) {
        dispatch({
          type: REDUCER.GET_COMPANIES_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.GET_COMPANIES_FAILED,
          payload: res,
        })
      }
    })
  } catch (error) {
    dispatch({
      type: REDUCER.GET_COMPANIES_FAILED,
      payload: error,
    })
  }
}

export function getCompaniesLoading() {
  return dispatch => dispatch({type: REDUCER.GET_COMPANIES_LOADING});
}

