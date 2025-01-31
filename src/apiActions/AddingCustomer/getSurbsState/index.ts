import {getSurbsStateId} from '../../../api2/AddingCustomer/getSurbsState';
import {REDUCER} from '../../../constants';
import {AppThunk} from '../../interface';

export default (stateId): AppThunk =>
  async dispatch => {
    try {
      const res = await getSurbsStateId(stateId);
      dispatch({
        type: REDUCER.GET_SUBURB_FILTER_SUCCESS,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
