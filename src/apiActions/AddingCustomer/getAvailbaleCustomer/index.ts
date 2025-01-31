import { Dispatch } from 'redux';
import {getAvailableCustomer} from '../../../api2/AddingCustomer/getAvailableCustomer';
import {AppThunk} from '../../interface';

export default (userId, stateId, blockId,suburbId,blocked,added,automatic,name,pageNo,pageSize): AppThunk =>
  async (dispatch: Dispatch)=> {
    try {
      const res = await getAvailableCustomer(userId, stateId, blockId,suburbId,blocked,added,automatic,name,pageNo,pageSize);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
