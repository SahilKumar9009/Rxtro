import { getPrevApps } from '../../../api2/AppointmentScreen/getPrevApp';
import { REDUCER } from '../../../constants';
import {AppThunk} from '../../interface';
import {store} from '../../../../App';

export default (userId, currentPage, pageSize): AppThunk =>
  async dispatch => {
    try {
      const res = await getPrevApps(userId, currentPage, pageSize);
      if (res) {
        let payload = Array.isArray(res) ? res : []; 


        if (currentPage >1) {
          const existingAppointments = store.getState().getPreviousAppointmentsReducer;
          payload = [...existingAppointments.appointments, ...payload];
        }

        dispatch({
          type: REDUCER.GET_PREVIOUS_APPOINTMENTS_SUCCESS,
          payload: payload // Use the combined payload here
        });
      } else {
        dispatch({
          type: REDUCER.GET_PREVIOUS_APPOINTMENTS_FAILED,
          payload: res
        });
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
