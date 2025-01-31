import {REDUCER} from '../constants';

const initialState ={
  surgeryDetail: {},
  loading: false,
  failed: false
}

export default function getSurgeryDetailReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_SURGERY_DETAIL_LOADING:
      return {...state, loading: true, failed: false};
    case REDUCER.GET_SURGERY_DETAIL_SUCCESS:
      return {
        ...state,
        surgeryDetail: action.payload,
        loading: false,
        failed: false
      };
    case REDUCER.GET_SURGERY_DETAIL_FAILED:
      return {
        ...state,
        surgeryDetail: {},
        loading: false,
        failed: true
      };
    default:
      return state;
  }
}