import {post} from '../..';

export const postReviewApp = data => {
  try {
    const response = post({
      path: '/confirm-app',
      data: data,
      isUrlEncoded: true,
      multipart: false,
    });
  } catch (error) {
    console.log('Error occurred during API call:', error);
  }
};
