import {getProductCompany} from "../../../api2/ProfileApi's/getProductCompany";
import { setUserData } from "../../../reducers/productReducer";


export default (companyId,) => async dispatch => {
  try {
    const res = await getProductCompany(companyId);
    dispatch(setUserData(res?.result));
    return res;
  } catch (error) {
    console.log(error);
  }
};

