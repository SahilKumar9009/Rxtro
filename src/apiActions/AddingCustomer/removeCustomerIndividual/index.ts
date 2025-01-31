import {removeCustomerIndividual} from '../../../api2/AddingCustomer/removeCustomerIndividual';
import {AppThunk} from '../../interface';

export default (userId, clinicId, doctorId): AppThunk => {
  return async dispatch => {
    const res = await removeCustomerIndividual(userId, clinicId, doctorId);
    console.log('in the removeCustomerIndividual response ', res);
    return res;
  };
};
