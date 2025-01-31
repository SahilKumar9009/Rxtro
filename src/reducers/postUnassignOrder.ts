import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postUnassignOrderReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_UNASSIGN_ORDER_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_UNASSIGN_ORDER_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_UNASSIGN_ORDER_FAILED:
      return {
        ...state,
        response: {},
        loading: false
      };
    default:
      return state;
  }
}