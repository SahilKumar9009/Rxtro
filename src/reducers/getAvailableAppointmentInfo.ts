import {REDUCER} from '../constants';

const initialState ={
  appointmentDetail: [],
}

export default function getAvailableAppointmentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_LOADING:
      return {...state};
    case REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_SUCCESS:
      return {
        ...state,
        appointmentDetail: action.payload,
      };
    case REDUCER.GET_AVAILABLE_APPOINTMENT_INFO_FAILED:
      return {
        ...state,
        appointmentDetail: [],
      };
    default:
      return state;
  }
}