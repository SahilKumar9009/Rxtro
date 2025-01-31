import {REDUCER} from '../constants';

const initialState ={
  response: {},
}

export default function postConfirmAppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_CONFIRM_APPOINTMENT_LOADING:
      return {...state};
    case REDUCER.POST_CONFIRM_APPOINTMENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case REDUCER.POST_CONFIRM_APPOINTMENT_FAILED:
      return {
        ...state,
        response: [],
      };
    default:
      return state;
  }
}