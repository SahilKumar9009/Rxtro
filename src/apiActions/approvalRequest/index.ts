import RequestApproval from '../../api2/approvalRequest';
import {AppThunk} from '../interface';

export default (userId, clinicId, body): AppThunk =>
  async dispatch => {
    try {
      const res = await RequestApproval(userId, clinicId, body);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
