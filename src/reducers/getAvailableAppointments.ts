import {REDUCER} from '../constants';

const initialState ={
  appointments: [],
  loading: false,
  isAvailable: false
}

export default function getAvailableAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_AVAILABLE_APPOINTMENTS_LOADING:
      return {...state, loading: true, isAvailable: false};
    case REDUCER.GET_AVAILABLE_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
        isAvailable: true
      };
    case REDUCER.GET_AVAILABLE_APPOINTMENTS_FAILED:
      return {
        ...state,
        appointments: [],
        loading: false,
        isAvailbale: false
      };
    default:
      return state;
  }
}