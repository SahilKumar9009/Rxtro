import {post} from '../..';
import {getProfileData} from '../../../actions';
import {BASE_URL} from '../../../constants/api';

export const postUploadVister = async (userId, data) => {
  const path = `o/representative/${userId}/logo`;
  try {
    const response = await post({
      path,
      data: data,
      multipart: true,
    });
    if (response?.statusCode) {
      console.log('IMAGE UPLOADED  successfully:', response?.statusCode);
    }
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
