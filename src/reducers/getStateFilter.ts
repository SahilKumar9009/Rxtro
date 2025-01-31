import {REDUCER} from '../constants';

const initialState ={
  states: [],
}

export default function getStateFilterReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_STATE_FILTER_LOADING:
      return {...state};
    case REDUCER.GET_STATE_FILTER_SUCCESS:
      return {
        ...state,
        states: action.payload,
      };
    case REDUCER.GET_STATE_FILTER_FAILED:
      return {
        ...state,
        states: [],
      };
    default:
      return state;
  }
}