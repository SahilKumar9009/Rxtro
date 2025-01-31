import {REDUCER} from '../constants';

const initialState = {
  response: {},
};

export default function postCompleteAppointmentReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case REDUCER.POST_COMPLETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };
    case REDUCER.POST_COMPLETE_APPOINTMENT_FAIL:
      return {
        ...state,
        response: action.payload,
      };
    case REDUCER.POST_COMPLETE_APPOINTMENT_CLEAR:
      return {};
    default:
      return state;
  }
}
