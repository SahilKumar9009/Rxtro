import {Alert} from 'react-native';
import {put} from '../..';
import {BASE_URL} from '../../../constants/api';

export const addCustomerGroup = async (userId, clinicId) => {
  try {
    const response = await put({
      path: `${BASE_URL}o/rep-territory/userId/${userId}/add-clinic?clinicId=${clinicId}`,
      data: {},
      multipart: false,
    });

    if (response?.statusCode === 200) {
      console.log('Request successful:', response.statusCode);
      return response?.statusCode;
    } else {
      console.log('Unexpected response:', response?.statusCode);
      return response?.statusCode;
    }
  } catch (error) {
    console.log('errors', error);
  }
};
