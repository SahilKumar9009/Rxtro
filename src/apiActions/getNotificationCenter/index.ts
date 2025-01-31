import {getCutomerSchedules} from '../../api2/getCutomerSchedules';
import {getNotificationCenter} from '../../api2/getNotificationCenter';
import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';

export default (userId, territoryId) =>
  async dispatch => {
    try {
      const res = await getNotificationCenter(userId,territoryId);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
