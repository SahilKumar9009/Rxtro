import { getProfileData } from "../../../actions/userProfile";
import {postUpdateRep} from "../../../api2/ProfileApi's/postUpdateRep";

export default (userId, data) => async dispatch => {
  try {
    const res = await postUpdateRep(userId, data);
    if (res?.statusCode === 200) {
      dispatch(getProfileData());
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
