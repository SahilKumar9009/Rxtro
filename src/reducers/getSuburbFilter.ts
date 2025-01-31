import {REDUCER} from '../constants';

const initialState ={
  suburbs: [],
}

export default function getSuburbFilterReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_SUBURB_FILTER_LOADING:
      return {...state};
    case REDUCER.GET_SUBURB_FILTER_SUCCESS:
      return {
        ...state,
        suburbs: action.payload,
      };
    case REDUCER.GET_SUBURB_FILTER_FAILED:
      return {
        ...state,
        suburbs: [],
      };
    default:
      return state;
  }
}