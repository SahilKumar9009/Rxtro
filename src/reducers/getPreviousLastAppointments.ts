import {REDUCER} from '../constants';

const initialState ={
  appointments: [],
  loading: false
}

export default function getPreviousLastAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: action.payload,
        loading: false
      };
    case REDUCER.GET_PREVIOUS_LAST_APPOINTMENTS_FAILED:
      return {
        ...state,
        appointments: [],
        loading: false
      };
    default:
      return state;
  }
}