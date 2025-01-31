import api from '../api';
import {REDUCER} from '../constants';
import {stopLoader} from './globalLoader';

type args = {
  surgeryId: number | undefined;
};

export const getSurgeryDetail =
  ({surgeryId}: args) =>
  dispatch => {
    try {
      api
        .getAuthorized('wx.surgery/get-surgery-detail', {surgeryId: surgeryId})
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.GET_SURGERY_DETAIL_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.GET_SURGERY_DETAIL_FAILED,
              payload: res,
            });
          }
          dispatch(stopLoader());
        });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_SURGERY_DETAIL_FAILED,
        payload: error,
      });
    }
  };

export function getSurgeryDetailLoading() {
  return dispatch => dispatch({type: REDUCER.GET_SURGERY_DETAIL_LOADING});
}
