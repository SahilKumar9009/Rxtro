import {addCustomerGroup} from '../../../api2/AddingCustomer/addCustomerGroup';
import {addCustomerIndividual} from '../../../api2/AddingCustomer/addCustomerIndividual';
import {AppThunk} from '../../interface';

export default (userId, clinicId): AppThunk => {
  return async dispatch => {
    const res = await addCustomerGroup(userId, clinicId);
    console.log('in the add Customer Group', res);
    return res;
  };
};
