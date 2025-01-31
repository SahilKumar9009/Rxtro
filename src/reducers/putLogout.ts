import {REDUCER} from '../constants';

const initialState = {
  response: {},
  loading: false,
};

export default function putLogoutReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.PUT_LOGOUT_LOADING:
      return {...state, loading: true};
    case REDUCER.PUT_LOGOUT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case REDUCER.PUT_LOGOUT_FAILED:
      return {
        ...state,
        response: {},
        loading: false,
      };
    case REDUCER.PUT_LOGOUT_AFTER_SUCCESS:
      return {
        ...state,
        response: {},
        loading: false,
      };
    default:
      return state;
  }
}
