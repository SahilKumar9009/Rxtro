import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';
import {findMyCustomer} from '../../api2/findMyCustomer';
import { startLoader ,stopLoader} from '../../actions/globalLoader';
export default (
  userId,
  stateId,
  blockId,
  name,
  pageNo,
  pageSize = 5,
  automatic = 2,
  booked = 2 
): AppThunk =>
  async dispatch => {
    try {
      startLoader();
      const res = await findMyCustomer(
        userId,
        stateId,
        blockId,
        name,
        pageNo,
        pageSize = 5,
        automatic = 2,
        booked = 2,
       )         
      if (res){
        dispatch({
          type: REDUCER.GET_APPOINTMENT_INFO_SUCCESS,
          payload: res
        })
      }
      stopLoader();
      return res;
    } catch (error) {
      console.log(error);
    }
  };
