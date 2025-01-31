import {REDUCER} from '../constants';

const initialState ={
  appointments: [],
  loading: false
}

export default function getFutureAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_FUTURE_APPOINTMENTS_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_FUTURE_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
        loading: false
      };
    case REDUCER.GET_FUTURE_APPOINTMENTS_FAILED:
      return {
        ...state,
        appointments: [],
        loading: false
      };
    default:
      return state;
  }
}