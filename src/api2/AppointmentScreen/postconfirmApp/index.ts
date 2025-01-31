import {post} from '../..';
import {BASE_URL} from '../../../constants/api';

export const confirmApp = (userId, appId) => {
  try {
    const response = post({
      path: `${BASE_URL}o/representative-app/${userId}/appointment/${appId}/confirm`,
      data: {},
      isUrlEncoded: false,
      multipart: false,
    });
  } catch (error) {
    console.log('Error occurred during API call:', error);
  }
};
