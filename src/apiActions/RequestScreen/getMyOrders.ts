import { get } from '../../api2';
import {REDUCER} from '../../constants';

type args = {
  drugRepId: string | null
}

export const getMyOrders = ({drugRepId}: args) => async(dispatch)=> {
  try {
        const res = await get({
          path: `https://staging.rxtro.com/api/jsonws/api/jsonws/wx.sampleorder/get-my-shopping-order-items?drugRepId=${drugRepId}`,
          params: {},
          noLoader: true,
        })
        if(res?.['internal-code'] === 200) {
          
        dispatch({
          type: REDUCER.GET_MY_ORDERS_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.GET_MY_ORDERS_FAILED,
          payload: res
        })
      }
    
  } catch(error) {
    dispatch({
      type: REDUCER.GET_MY_ORDERS_FAILED,
      payload: error,
    });
  }
};

export function getMyOrdersLoading() {
  return dispatch => dispatch({type: REDUCER.GET_MY_ORDERS_LOADING});
}