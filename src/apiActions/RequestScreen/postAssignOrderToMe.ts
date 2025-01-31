import { BASE_URL } from './../../constants/api/index';
import {CustomerIO} from 'customerio-reactnative';
import api from '../../api';
import {REDUCER} from '../../constants';
import { post } from '../../api2';

type args = {
  orderItemIds: number | number[];
  drugRepId: string | null;
};

export const postAssignOrderToMe =
  ({orderItemIds, drugRepId}: args) =>
  async(dispatch) => {
    try {
      const res =  await post({
        path:`${BASE_URL}api/jsonws/wx.sampleorder/assign-order-item-to-me?drugRepId=${drugRepId}&orderItemIds=${orderItemIds}`,
        data: {},
      })


      if(res?.['internal-code'] === 200){    
            dispatch({
              type: REDUCER.POST_ASSIGN_ORDER_TO_ME_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_ASSIGN_ORDER_TO_ME_FAILED,
              payload: res,
            });
          }
    } catch (error) {
      dispatch({
        type: REDUCER.POST_ASSIGN_ORDER_TO_ME_FAILED,
        payload: error,
      });
    }
  };

export function postAssignOrderToMeLoading() {
  return dispatch => dispatch({type: REDUCER.POST_ASSIGN_ORDER_TO_ME_LOADING});
}
