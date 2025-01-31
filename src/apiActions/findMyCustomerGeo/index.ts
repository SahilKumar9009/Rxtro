import {findMyCustomerGeo} from '../../api2/findMyCustomerGeo';
import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';

export default (userId, setSurbs): AppThunk =>
  async dispatch => {
    try {
      const res = await findMyCustomerGeo(userId);
      setSurbs(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
