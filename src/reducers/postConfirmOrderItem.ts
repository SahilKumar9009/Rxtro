import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postConfirmOrderItemReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_CONFIRM_ORDER_ITEM_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_CONFIRM_ORDER_ITEM_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_CONFIRM_ORDER_ITEM_FAILED:
      return {
        ...state,
        response: [],
        loading: false
      };
    default:
      return state;
  }
}