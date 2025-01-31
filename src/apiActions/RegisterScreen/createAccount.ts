import { stopLoader } from "../../actions/globalLoader";
import { createAccount } from "../../api2/RegisterScreen/createAccount";

export default ( data, setModalVisible, setLoading) => async dispatch => {
  try {
    const res = await createAccount(data);
    if(res === 200) {
     setLoading(false);
     setModalVisible(true);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};
