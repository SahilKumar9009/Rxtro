import {REDUCER} from '../constants';

const initialState = {
  notificationData: [],
  gotNotification: false
}

export default function setNotificationReducer(state = initialState, action) {
  if (action.type === REDUCER.SET_NOTIFICATION_SUCCESS) {
    return {
      ...state, 
      notificationData: action.payload,
      gotNotification: true
    }
  } else {
    return state
  }
} 