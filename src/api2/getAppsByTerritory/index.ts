import {get} from '..';
import {BASE_URL} from '../../constants/api';

export const getAppsByTerritory = async (userId, territoryId, pageNo, pageSize) => {
  console.log('in the getAppsByTerrirtopr', userId, territoryId);
  try {
    const response = await get({
      path: `${BASE_URL}o/representative-app/${userId}/territory/${territoryId}/available-take-apps?page=${pageNo}&pageSize=${pageSize}`,
      params: {},
      noLoader: true,
    });
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
