import {deleteApi} from '../..';
import {API, BASE_URL} from '../../../constants/api';

export const RemoveCustomerGroup = async (userId, clinicId) => {
  try {
    const response = await deleteApi({
      path: `${BASE_URL}${API.REMOVE_CUSTOMER}/userId/${userId}/remove-clinic-territory?clinicId=${clinicId}`,
      data: {},
    });
    return response?.statusCode;
  } catch (error) {
    throw error;
  }
};
