import {getStates} from '../../../api2/AddingCustomer/getStates';
import {REDUCER} from '../../../constants';
import {AppThunk} from '../../interface';

export default (): AppThunk => async dispatch => {
  try {
    const res = await getStates();
    dispatch({
      type: REDUCER.GET_STATE_FILTER_SUCCESS,
      payload: res,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
