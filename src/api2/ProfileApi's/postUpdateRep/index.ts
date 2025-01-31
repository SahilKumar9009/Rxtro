import {post} from '../..';
import {getProfileData} from '../../../actions';
import {BASE_URL} from '../../../constants/api';

export const postUpdateRep = async (userId, profileData) => {
  const path = `${BASE_URL}o/representative/${userId}`;
  try {
    const response = await post({
      path,
      data: profileData,
    });
    console.log('Profile updated successfully:', response?.data);
    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
