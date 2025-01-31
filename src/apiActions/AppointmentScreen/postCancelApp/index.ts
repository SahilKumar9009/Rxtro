import {postCancelApp} from '../../../api2/AppointmentScreen/postCancelApp';
import { REDUCER } from '../../../constants/reducerConstant';
import {AppThunk} from '../../interface';

export default (userId, appId): AppThunk =>
  async dispatch => {
    try {
      const res = await postCancelApp(userId, appId);
      if(res?.statusCode === 200){
        dispatch({
          type: REDUCER.POST_CANCEL_APPOINTMENT_SUCCESS,
          payload: res,
        });
      }else {
        dispatch({
          type: REDUCER.POST_CANCEL_APPOINTMENT_FAILED,
          payload: res,
        });
      }
      console.log('Post Cancel App ', res);
      return res;
    } catch (error) {
      console.log(error);
      dispatch({
        type: REDUCER.POST_CANCEL_APPOINTMENT_FAILED,
        payload: error,
      });
    }
  };
