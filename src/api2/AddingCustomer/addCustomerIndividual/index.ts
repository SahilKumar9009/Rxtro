import {put} from '../..';
import {BASE_URL} from '../../../constants/api';

export const addCustomerIndividual = async (userId, clinicId, doctorId) => {
  try {
    console.log("in the userId, clinnicId",userId,clinicId,doctorId)
    const response = await put({
      path: `${BASE_URL}o/rep-territory/userId/${userId}/add-individual?clinicId=${clinicId}&doctorId=${doctorId}`,
      data: {},
      multipart: false,
    });
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
