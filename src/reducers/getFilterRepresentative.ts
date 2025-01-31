import {REDUCER} from '../constants';

const initialState ={
  representatives: [],
}

export default function getFilterRepresentativeReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_FILTER_REPRESENTAIVE_LOADING:
      return {...state};
    case REDUCER.GET_FILTER_REPRESENTAIVE_SUCCESS:
      return {
        ...state,
        representatives: action.payload,
      };
    case REDUCER.GET_FILTER_REPRESENTAIVE_FAILED:
      return {
        ...state,
        representatives: [],
      };
    default:
      return state;
  }
}