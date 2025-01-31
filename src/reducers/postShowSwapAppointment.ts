import {REDUCER} from '../constants';

const initialState ={
  appointments: {},
}

export default function postShowSwapAppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_SHOW_SWAP_APPOINTMENT_LOADING:
      return {...state};
    case REDUCER.POST_SHOW_SWAP_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
      };
    case REDUCER.POST_SHOW_SWAP_APPOINTMENT_FAILED:
      return {
        ...state,
        appointments: [],
      };
    default:
      return state;
  }
}