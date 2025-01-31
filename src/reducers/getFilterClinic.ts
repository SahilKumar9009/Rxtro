import {REDUCER} from '../constants';

const initialState ={
  clinics: [],
}

export default function getFilterClinicReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_FILTER_CLINIC_LOADING:
      return {...state};
    case REDUCER.GET_FILTER_CLINIC_SUCCESS:
      return {
        ...state,
        clinics: action.payload,
      };
    case REDUCER.GET_FILTER_CLINIC_FAILED:
      return {
        ...state,
        clinics: [],
      };
    default:
      return state;
  }
}