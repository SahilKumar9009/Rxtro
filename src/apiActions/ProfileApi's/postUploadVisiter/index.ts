import {getProfileData} from '../../../actions/userProfile';
import {postUploadVister} from "../../../api2/ProfileApi's/postUploadVisiter";

export default (userId, data) => async dispatch => {
  try {
    console.log('in the userId', userId, data);
    const res = await postUploadVister(userId, data);
    if (res?.statusCode) {
      dispatch(getProfileData());
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
