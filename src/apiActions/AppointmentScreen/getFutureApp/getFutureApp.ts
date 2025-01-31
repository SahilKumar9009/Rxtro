import { store } from '../../../../App';
import {getFutureApp} from '../../../api2/AppointmentScreen/getFutureApp';
import { REDUCER } from '../../../constants';
import {AppThunk} from '../../interface';

export default (userId,currentPage,pageSize): AppThunk =>
  async dispatch => {
    try {
      const res = await getFutureApp(userId, currentPage , pageSize);
      if (res && currentPage >1) {
        let payload = Array.isArray(res) ? res : []; 
         const existingAppointments = store.getState().getFutureAppointmentsReducer;
         payload = [...existingAppointments.appointments, ...payload];
        dispatch({
          type: REDUCER.GET_FUTURE_APPOINTMENTS_SUCCESS,
          payload: payload
        })
      } else {
        dispatch({
          type: REDUCER.GET_FUTURE_APPOINTMENTS_SUCCESS,
          payload: res
        })
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
