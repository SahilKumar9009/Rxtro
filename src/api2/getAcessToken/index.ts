import {getUserProfile} from '../../actions';
import {AppThunk} from '../interface';

export default (email, password): AppThunk =>
  async dispatch => {
    try {
      const response = await getUserProfile(email, password);
    } catch (error) {
      console.log(error);
    }
  };
