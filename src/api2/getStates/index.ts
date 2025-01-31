import {get} from '..';
import {API, BASE_URL} from '../../constants/api';

export const getAllStates = () => {
  try {
    const response = get({
      path: `${BASE_URL}${API.GETALLSTATES}`,
      params: {},
      noLoader: true,
    });
  } catch (error) {}
};
