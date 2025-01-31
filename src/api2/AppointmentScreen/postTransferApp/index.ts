import {post} from '../..';

export const postTransferApp = data => {
  try {
    const response = post({
      path: '/confirm-app',
      data: data,
      isUrlEncoded: true,
      multipart: false,
    });
    console.log('in the response', response);
  } catch (error) {
    console.log('Error occurred during API call:', error);
  }
};
