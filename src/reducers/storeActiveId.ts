import {REDUCER} from '../constants';

const initialState = {
  territoryId: null,
  surgeryId: null,
  globalLoading: false,
  hasAppointmentDetails: false,
  appointmentDetails: {},
};

export default function storeIdReducer(state = initialState, action) {
  console.log("in the reducer", state, action);
  switch (action.type) {
    // ! global loader
    case REDUCER.START_LOADING:
      return {
        ...state,
        globalLoading: true,
      };
    case REDUCER.STOP_LOADING:
      return {
        ...state,
        globalLoading: false,
      };

    //! for my territory screen
    case REDUCER.STORE_TERRITORY_ID:
      return {
        ...state,
        territoryId: action.payload,
      };
    case REDUCER.CLEAR_TERRITORY_ID:
      return {
        ...state,
        territoryId: null,
      };
    case REDUCER.STORE_SURGERY_ID:
      return {
        ...state,
        surgeryId: action.payload,
      };
    case REDUCER.CLEAR_SURGERY_ID:
      return {
        ...state,
        surgeryId: null,
      };

    //! for appointment details screen
    case REDUCER.STORE_APPOINTMENT_DETAILS:
      return {
        ...state,
        appointmentDetails: action.payload,
        hasAppointmentDetails: true,
      };
    case REDUCER.CLEAR_APPOINTMENT_DETAILS:
      return {
        ...state,
        appointmentDetails: {},
        hasAppointmentDetails: false,
      };

    default:
      return state;
  }
}
