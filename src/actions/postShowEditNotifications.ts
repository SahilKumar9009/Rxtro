import api from '../api';
import {REDUCER} from '../constants';

type args = {
  territoryId: number | undefined
}

export const postShowEditNotifications = ({territoryId}: args) => dispatch => {
  try {
     api.postAuthorizedFormData('wx.territory/show-edit-notifications', {territoryId: territoryId}).then(res => {
      if (res['internal-code'] === 200) {
        dispatch({
          type: REDUCER.POST_SHOW_EDIT_NOTIFICATION_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: REDUCER.POST_SHOW_EDIT_NOTIFICATION_FAILED,
          payload: res
        })
      }
    })
  } catch(error) {
    dispatch({
      type: REDUCER.POST_SHOW_EDIT_NOTIFICATION_FAILED,
      payload: error,
    });
  }
};

export function postShowEditNotificationsLoading() {
  return dispatch => dispatch({type: REDUCER.POST_SHOW_EDIT_NOTIFICATION_LOADING});
}