import {get} from '../..';
import {API, BASE_URL} from '../../../constants/api';

export const getStates = async () => {
  try {
    const response = await get({
      path: `${BASE_URL}${API.GETALLSTATES}`,
      params: {},
      noLoader: true,
    });

    console.log('Get States response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};
