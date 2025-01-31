import api from '../api';
import { get } from '../api2';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null;
};

export const getLastCancellation =
  ({drugRepId}: args) =>
  async dispatch => {
    try {

      const res = await get({
        path: `https://staging.rxtro.com/api/jsonws/api/jsonws/wx.territory/get-last-cancellations?drugRepId=${drugRepId}`,
        params: {},
        noLoader: true,
      })

      if(res?.['internal-code'] === 200) {
        dispatch({
          type: REDUCER.GET_LAST_CANCELLATIONS_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.GET_LAST_CANCELLATIONS_FAILED,
          payload: res,
        });
      }
      // api
      //   .getAuthorized('wx.territory/get-last-cancellations', {
      //     drugRepId: drugRepId,
      //   })
      //   .then(res => {
      //     if (res['internal-code'] === 200) {
      //       dispatch({
      //         type: REDUCER.GET_LAST_CANCELLATIONS_SUCCESS,
      //         payload: res,
      //       });
      //     } else {
      //       dispatch({
      //         type: REDUCER.GET_LAST_CANCELLATIONS_FAILED,
      //         payload: res,
      //       });
      //     }
      //   });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_LAST_CANCELLATIONS_FAILED,
        payload: error,
      });
    }
  };

export function getLastCancellationLoading() {
  return dispatch => dispatch({type: REDUCER.GET_LAST_CANCELLATIONS_LOADING});
}
