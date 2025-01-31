
// import {getAllCompanies} from '../../api2/getCompanies';
import { getTeams } from '../../api2/RegisterScreen/getTeams';
import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';

export default (orgId): AppThunk => async dispatch => {
  try {
    const res = await getTeams(orgId);
    console.log("i the get teams res", res)
   dispatch({
    type: REDUCER.GET_TEAMS_SUCCESS,
    payload: res,
  });
  } catch (error) {
    console.log(error);
  }
};
