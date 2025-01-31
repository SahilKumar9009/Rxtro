// import {CustomerIO} from 'customerio-reactnative';
import api from "../../api";
import { REDUCER } from "../../constants";
import { post } from "../../api2";

type args = {
  drugRepId: string | null;
  orderItemIds: string;
};

export const postUnassignOrder =
  ({ drugRepId, orderItemIds }: args) =>
  async (dispatch) => {
    try {
      const res = await post({
        path: `https://staging.rxtro.com/api/jsonws/api/jsonws/wx.sampleorder/unnassign-order-item?drugRepId=${drugRepId}&orderItemIds=${orderItemIds}`,
        data: {},
      });
      if (res?.["internal-code"] === 200) {
        // CustomerIO.track('unnassign-order-item', {
        //           orderItemIds,
        //           drugRepId,
        //           ...res,
        //         });
        dispatch({
          type: REDUCER.POST_UNASSIGN_ORDER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.POST_UNASSIGN_ORDER_FAILED,
          payload: res,
        });
      }
    } catch (error) {
      dispatch({
        type: REDUCER.POST_UNASSIGN_ORDER_FAILED,
        payload: error,
      });
    }
  };

export function postUnassignOrderLoading() {
  return (dispatch) => dispatch({ type: REDUCER.POST_UNASSIGN_ORDER_LOADING });
}
