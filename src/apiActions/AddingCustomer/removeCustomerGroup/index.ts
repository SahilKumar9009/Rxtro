import {RemoveCustomerGroup} from '../../../api2/AddingCustomer/removeCustomerGroup';
import {AppThunk} from '../../interface';

export default (userId, clinicId): AppThunk => {
  return async dispatch => {
    const res = await RemoveCustomerGroup(userId, clinicId);
    return res;
  };
};
