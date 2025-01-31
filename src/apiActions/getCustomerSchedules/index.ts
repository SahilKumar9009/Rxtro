import {getCutomerSchedules} from '../../api2/getCutomerSchedules';

export default territoryId => async dispatch => {
  try {
    const res = await getCutomerSchedules(territoryId);
    return res;
  } catch (error) {
    console.log(error);
  }
};
