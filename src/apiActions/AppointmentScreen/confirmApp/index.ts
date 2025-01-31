import {confirmApp} from '../../../api2/AppointmentScreen/postconfirmApp';
import {AppThunk} from '../../interface';


type args = {
  appId: number;
  appointmentDetails: any;
};

export default ({ appId, appointmentDetails }: args): AppThunk =>
  async dispatch => {
    try {
      // const res = await confirmApp(userId, appId);
      // console.log('In the Confirm App', res);
      // if (response) {
      //           CustomerIO.track('confirm-appointment', {
      //             ...appointmentDetails,
      //             appointmentID: appId,
      //           });/
      //           dispatch({
      //             type: REDUCER.POST_CONFIRM_APPOINTMENT_SUCCESS,
      //             payload: response.data,
      //           });
      //         } else {
      //           dispatch({
      //             type: REDUCER.POST_CONFIRM_APPOINTMENT_FAILED,
      //             payload: response.data,
      //           });
      //         }
      // return res;
    } catch (error) {
      console.log(error);
    }
  };





// import { CustomerIO } from 'customerio-reactnative';
// import api from '../api';
// import { REDUCER } from '../constants';

// type args = {
//   appId: number;
//   appointmentDetails: any;
// };

// export const postConfirmAppointment =
//   ({ appId, appointmentDetails }: args) =>
//   async (dispatch) => {
//     dispatch(postConfirmAppointmentLoading()); // Dispatch loading action

//     try {
//       const response = await api.post<{ 'internal-code': number }>({
//         path: 'wx.appointment/confirm-app',
//         data: { appId },
//       });

//       if (response.statusCode === 200) {
//         CustomerIO.track('confirm-appointment', {
//           ...appointmentDetails,
//           appointmentID: appId,
//         });
//         dispatch({
//           type: REDUCER.POST_CONFIRM_APPOINTMENT_SUCCESS,
//           payload: response.data,
//         });
//       } else {
//         dispatch({
//           type: REDUCER.POST_CONFIRM_APPOINTMENT_FAILED,
//           payload: response.data,
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: REDUCER.POST_CONFIRM_APPOINTMENT_FAILED,
//         payload: error,
//       });
//     }
//   };

// export function postConfirmAppointmentLoading() {
//   return (dispatch) => dispatch({ type: REDUCER.POST_CONFIRM_APPOINTMENT_LOADING });
// }