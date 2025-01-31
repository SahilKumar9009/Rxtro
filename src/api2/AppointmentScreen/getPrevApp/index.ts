import {get} from '../..';
import {BASE_URL} from '../../../constants/api';

export const getPrevApps = async (userId,currentPage, pageSize) => {
  try {
    const response = await get({
      path: `${BASE_URL}o/representative-app/${userId}/appointment/previous?colleagueId=0&page=${currentPage}&pageSize=${pageSize}`,
      params: {},
      noLoader: true,
    });
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
