import {REDUCER} from '../constants';

const initialState ={
  response: {},
  loading: false
}

export default function postAddDrugRepresentativeReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_ADD_DRUG_REPRESENTATIVE_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_ADD_DRUG_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case REDUCER.POST_ADD_DRUG_REPRESENTATIVE_FAILED:
      return {
        ...state,
        response: {},
        loading: false
      };
    default:
      return state;
  }
}