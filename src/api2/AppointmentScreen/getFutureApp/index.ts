import {get} from '../..';
import {BASE_URL} from '../../../constants/api';

export const getFutureApp = async (userId, currentPage,pageSize) => {
  try {
    const response = await get({
      path: `${BASE_URL}/o/representative-app/${userId}/appointment/future?page=${currentPage}&pageSize=${pageSize}`,
      params: {},
      noLoader: true,
    });
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};
