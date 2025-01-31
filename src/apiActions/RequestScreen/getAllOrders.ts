import api from '../../api';
import { get } from '../../api2';
import {REDUCER} from '../../constants';
import { BASE_URL } from '../../constants/api';

type args = {
  drugRepId: string | null
}


export const getAllOrders = ({drugRepId}:args) => async (dispatch) => {
  try {
        const res = await get({
          path: `${BASE_URL}api/jsonws/wx.sampleorder/get-shopping-order-items?drugRepId=${drugRepId}`,
          noLoader: true,
        });
        if (res?.['internal-code'] === 200) {
          dispatch({
            type: REDUCER.GET_ALL_ORDERS_SUCCESS,
            payload: res
          })
        } else {
          dispatch({
            type: REDUCER.GET_ALL_ORDERS_FAILED,
            payload: res
          })
        }
} catch(error) {
    dispatch({
      type: REDUCER.GET_ALL_ORDERS_FAILED,
      payload: error,
    });
  }
};

export function getAllOrdersLoading() {
  return dispatch => dispatch({type: REDUCER.GET_ALL_ORDERS_LOADING});
}