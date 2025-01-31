import {REDUCER} from '../constants';

const initialState ={
  fileredAppointments: [],
  filterClinic: ""
}

export default function postFilterMyAppointmentsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_FILTER_MY_APPOINTMENTS_LOADING:
      return {...state};
    case REDUCER.POST_FILTER_MY_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        fileredAppointments: action.payload,
        filterClinic: action.filterClinic
      };
    case REDUCER.POST_FILTER_MY_APPOINTMENTS_FAILED:
      return {
        ...state,
        fileredAppointments: [],
        filterClinic: ""
      };
    default:
      return state;
  }
}