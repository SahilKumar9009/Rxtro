import {findMyCustomer} from '../../api2/findMyCustomer';
import {getAppsByTerritory} from '../../api2/getAppsByTerritory';
import {REDUCER} from '../../constants';
import {AppThunk} from '../interface';

export default (userId, territoryId, pageNo, pageSize,setAppointmentData): AppThunk =>
  async dispatch => {
    try {
      const res = await getAppsByTerritory(userId, territoryId, pageNo, pageSize);
      if (res) {
        setAppointmentData(res);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  };
