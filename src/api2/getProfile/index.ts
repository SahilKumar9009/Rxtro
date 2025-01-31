import {getProfileData, getUserProfile} from '../../actions';
import {AppThunk} from '../interface';

export default (userId): AppThunk =>
  async dispatch => {
    try {
      const response = await getProfileData(userId);
    } catch (error) {
      console.log(error);
    }
  };
