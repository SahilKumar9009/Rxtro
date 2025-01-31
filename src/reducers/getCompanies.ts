import {REDUCER} from '../constants';

const initialState ={
  companies: [],
}

export default function getCompaniesReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_COMPANIES_LOADING:
      return {...state};
    case REDUCER.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
      };
    case REDUCER.GET_COMPANIES_FAILED:
      return {
        ...state,
        companies: [],
      };
    default:
      return state;
  }
}