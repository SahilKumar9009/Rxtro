import api from '../api';
import { post } from '../api2';
import { REDUCER } from '../constants';

type Args = {
  userId: number;
  territoryId: number;
  notifications: object; // Ensure this is the correct type for your notifications
};

export const postEditNotifications =
  ({ userId, territoryId, notifications }: Args) =>
  async (dispatch) => {
    console.log("In the body params", notifications); // Log the notifications for debugging

    dispatch(postEditNotificationsLoading()); 

    try {
      const response = await post({
        path: `https://staging.rxtro.com/o/rep-territory/${userId}/notifications/${territoryId}`,
        data: notifications,
      });


      console.log("int the response", response); 
      
      if (response && response['internal-code'] === 200) {
        dispatch({
          type: REDUCER.POST_EDIT_NOTIFICATIONS_SUCCESS,
          payload: response,
        });
      } else {
        dispatch({
          type: REDUCER.POST_EDIT_NOTIFICATIONS_FAILED,
          payload: response,
        });
      }
    } catch (error) {
      dispatch({
        type: REDUCER.POST_EDIT_NOTIFICATIONS_FAILED,
        payload: error.message || 'An error occurred while updating notifications.',
      });
    }
  };

export function postEditNotificationsLoading() {
  return (dispatch) => dispatch({ type: REDUCER.POST_EDIT_NOTIFICATIONS_LOADING });
}