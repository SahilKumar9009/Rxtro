import {get} from '../..';
import {API, BASE_URL} from '../../../constants/api';

export const getSurbsStateId = async stateId => {
  try {
    const response = await get({
      path: `${BASE_URL}${API.GETSURBSSTATE}/${stateId}/suburbsv2`,
      params: {},
      noLoader: true,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
