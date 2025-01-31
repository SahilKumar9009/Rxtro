import {REDUCER} from '../constants';

const initialState = {
  response: {},
  loading: false,
};

export default function postCancelAppointmentReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case REDUCER.POST_CANCEL_APPOINTMENT_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_CANCEL_APPOINTMENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case REDUCER.POST_CANCEL_APPOINTMENT_FAILED:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    case 'POST_CANCEL_APPOINTMENT_CLEAR':
      return {
        ...state,
        response: {},
        loading: false,
      };
    default:
      return state;
  }
}
