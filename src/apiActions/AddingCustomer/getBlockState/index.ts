import {get} from '../../../api2';
import {getBlocksByState} from '../../../api2/AddingCustomer/getBlockState';
import {REDUCER} from '../../../constants';
import {AppThunk} from '../../interface';

export default (stateId): AppThunk =>
  async dispatch => {
    try {
      const res = await getBlocksByState(stateId);
      dispatch({
        type: REDUCER.GET_BLOCKS_SUCCESS,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
