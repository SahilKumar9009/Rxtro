import {get} from '..';
import {BASE_URL} from '../../constants/api';

export const getNotificationCenter = async (userId, territoryId) => {
  try {
    const response = await get({
      path: `${BASE_URL}/o/rep-territory/${userId}/notifications/${territoryId}`,
      params: {},
      noLoader: true,
    });

    console.log('in the in the get Notification:', response);
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
