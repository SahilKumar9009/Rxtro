import {get} from '..';
import {BASE_URL} from '../../constants/api';

export const getCutomerSchedules = async territoryId => {
  try {
    const response = await get({
      path: `${BASE_URL}/o/rep-territory/${territoryId}/schedules-availability`,
      params: {},
      noLoader: true,
    });

    console.log('in the in the get Schedules:', response);
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
