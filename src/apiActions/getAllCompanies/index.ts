import {getAllCompanies} from '../../api2/getCompanies';
import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';

export default (): AppThunk => async dispatch => {
  try {
    const res = await getAllCompanies();
    dispatch({
      type: REDUCER.GET_COMPANIES_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
};
