import {post} from '../..';
import {BASE_URL} from '../../../constants/api';

export const postCancelApp = (userId, appId) => {
  try {
    const response =  post({
      path: `${BASE_URL}o/representative-app/${userId}/appointment/${appId}/cancel`,
      data: {},
      isUrlEncoded: false,
      multipart: false,
    });
    console.log('Response:', response);
    return response
  } catch (error) {
    console.log("IN THE ERROR:",error)
  }
};
