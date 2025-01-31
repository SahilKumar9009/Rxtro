import {REDUCER} from '../constants';

const initialState ={
  appointmentDetail: [],
  dispatched: false
}

export default function getCompleteAppointmentReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_COMPLETE_APPOINTMENT_LOADING:
      return {...state};
    case REDUCER.GET_COMPLETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointmentDetail: action.payload,
        dispatched: action.dispatched
      };
    case REDUCER.GET_COMPLETE_APPOINTMENT_FAILED:
      return {
        ...state,
        appointmentDetail: [],
      };
    default:
      return state;
  }
}