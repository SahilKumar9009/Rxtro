import {get} from '../..';
import {BASE_URL} from '../../../constants/api';

export const getProductCompany = async companyId => {
  try {
    const response = await get({
      path: `${BASE_URL}o/representative/company/${companyId}`,
      params: {},
      noLoader: true,
    });


    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
