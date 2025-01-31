import {REDUCER} from '../constants';

const initialState ={
  orders: [],
  loading: false
}

export default function getAllOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_ALL_ORDERS_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false
      };
    case REDUCER.GET_ALL_ORDERS_FAILED:
      return {
        ...state,
        orders: [],
        loading: false
      };
    default:
      return state;
  }
}