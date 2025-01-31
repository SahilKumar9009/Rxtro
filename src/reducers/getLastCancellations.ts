import {REDUCER} from '../constants';

const initialState ={
  listOfCancellations: [],
  loading: false
}

export default function getLastCancellationReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_LAST_CANCELLATIONS_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_LAST_CANCELLATIONS_SUCCESS:
      return {
        ...state,
        listOfCancellations: action.payload,
        loading: false
      };
    case REDUCER.GET_LAST_CANCELLATIONS_FAILED:
      return {
        ...state,
        listOfCancellations: [],
        loading: false
      };
    default:
      return state;
  }
}