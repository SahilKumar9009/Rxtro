import {CustomerIO} from 'customerio-reactnative';
import {REDUCER} from '../../constants';
import { post } from '../../api2';
import { BASE_URL } from '../../constants/api';

type args = {
  drugRepId: string | null;
  orderItemIds: string | number;
};

export const postConfirmOrderItem =
  ({drugRepId, orderItemIds}: args) =>
  async(dispatch) => {
    try {
      const res = await post({
        path: `${BASE_URL}api/jsonws/wx.sampleorder/confirm-order-item?drugRepId=${drugRepId}&orderItemIds=${orderItemIds}`,
        data: {
          drugRepId,
          orderItemIds,
        }
        
      })

      if(res?.['internal-code'] === 200) {
            dispatch({
              type: REDUCER.POST_CONFIRM_ORDER_ITEM_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_CONFIRM_ORDER_ITEM_FAILED,
              payload: res,
            });
          }
        
    } catch (error) {
      dispatch({
        type: REDUCER.POST_CONFIRM_ORDER_ITEM_FAILED,
        payload: error,
      });
    }
  };

export function postConfirmOrderItemLoading() {
  return dispatch => dispatch({type: REDUCER.POST_CONFIRM_ORDER_ITEM_LOADING});
}
