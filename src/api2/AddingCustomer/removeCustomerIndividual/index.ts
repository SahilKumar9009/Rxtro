import {deleteApi} from '../..';
import {API, BASE_URL} from '../../../constants/api';

export const removeCustomerIndividual = async (userId, clinicId, doctorId) => {
  try {
    const response = await deleteApi({
      path: `${BASE_URL}${API.REMOVE_CUSTOMER}/userId/${userId}/remove-individual-territory?clinicId=${clinicId}&doctorId=${doctorId}`,
      data: {},
    });
    console.log("In the response", response)
    return response;
  } catch (error) {
    throw error;
  }
};
