import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postTakeAppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_TAKE_APPOINTMENT_LOADING:
      return {
        ...state,
        response: {},
        loading: true
      };
    case REDUCER.POST_TAKE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_TAKE_APPOINTMENT_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    default:
      return state;
  }
}