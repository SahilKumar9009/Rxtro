import {REDUCER} from "../constants";

export const setNotification = (notificationData) => dispatch => {
  dispatch({
    type: REDUCER.SET_NOTIFICATION_SUCCESS,
    payload: notificationData
  })
}