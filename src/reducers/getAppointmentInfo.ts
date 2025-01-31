import {REDUCER} from '../constants';

const initialState ={
  appointmentInfo: {},
}

export default function getAppointmentInfoReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_APPOINTMENT_INFO_LOADING:
      return {...state};
    case REDUCER.GET_APPOINTMENT_INFO_SUCCESS:
      return {
        ...state,
        appointmentInfo: action.payload,
      };
    case REDUCER.GET_APPOINTMENT_INFO_FAILED:
      return {
        ...state,
        appointmentInfo: [],
      };
    default:
      return state;
  }
}