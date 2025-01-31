import {addCustomerIndividual} from '../../../api2/AddingCustomer/addCustomerIndividual';
import {AppThunk} from '../../interface';

export default (userId, clinicId, doctorId): AppThunk => {
  return async dispatch => {
    const res = await addCustomerIndividual(userId, clinicId, doctorId);
    console.log('in the add individual response ', res);
    return res;
  };
};
