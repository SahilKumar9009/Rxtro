import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postAssignOrderToMeReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_ASSIGN_ORDER_TO_ME_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_ASSIGN_ORDER_TO_ME_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_ASSIGN_ORDER_TO_ME_FAILED:
      return {
        ...state,
        response: {},
        loading: false
      };
    default:
      return state;
  }
}