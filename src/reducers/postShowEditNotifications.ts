import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postShowEditNotificationsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_EDIT_NOTIFICATIONS_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_EDIT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_EDIT_NOTIFICATIONS_FAILED:
      return {
        ...state,
        response: {},
        loading: false
      };
    default:
      return state;
  }
}