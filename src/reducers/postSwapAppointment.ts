import {REDUCER} from '../constants';

const initialState ={
  swapResponse: {},
  loading: false
}

export default function postSwapappointmentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_SWAP_APPOINTMENT_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_SWAP_APPOINTMENT_SUCCESS:
      return {
        ...state,
        swapResponse: action.payload,
        loading: false
      };
    case REDUCER.POST_SWAP_APPOINTMENT_FAILED:
      return {
        ...state,
        swapResponse: action.payload,
        loading: false
      };
    default:
      return state;
  }
}