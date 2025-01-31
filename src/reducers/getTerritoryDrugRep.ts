import {REDUCER} from '../constants';

const initialState ={
  customers: [],
  loading: false
}

export default function getTerritoryDrugRepReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_TERRITORY_BY_DRUG_REP_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_TERRITORY_BY_DRUG_REP_SUCCESS:
      if(Array.isArray(action.payload.result)) {
        return {
          ...state,
          loading: false,
          customers: action.payload,
        };
      }
      
    case REDUCER.GET_TERRITORY_BY_DRUG_REP_FAILED:
      return {
        ...state,
        customers: [],
      };
    default:
      return state;
  }
}