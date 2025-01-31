import { BASE_URL } from "./../constants/api/index";
import { DEVICE_ID, REDUCER, USER_ID } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRepresentativeProfile } from "./representativeProfile";
import { Alert } from "react-native";
import axios from "axios";
import qs from "qs";
import { getTokens, setTokens } from "../methods/tokens";
import { get, refreshAccessToken } from "../api2";
import { API } from "../constants/api";
import navigateTo from "../navigation/navigate";
import getProfile from "../api2/getProfile";
import { ACTION_TYPES } from "../reducers/RepresentativeInfo";
// import notificationServices from '../helper/notificationServices';
import getProductCompany from "../apiActions/ProfileApi's/getProductCompany";
import configureStore from "../store";
import { startLoader, stopLoader } from "./globalLoader";

type args = {
  email: string;
  password: string;
  token: string;
  deviceId: string | null;
};

const { store } = configureStore();

export const getProfileData =
  (isLoginFlow = false) =>
  async (dispatch) => {
    try {
      const { accessToken } = await getTokens();
      if (!accessToken) {
        console.error("No access token found");
        return;
      }
      const response: any = await get({
        path: `${BASE_URL}${API.REPINFO}`,
        noLoader: false,
      });
      const profileData = response?.result;
      await AsyncStorage.setItem(USER_ID, `${response?.result?.userId}`);
      await AsyncStorage.setItem("USER_PROFILE", JSON.stringify(profileData));

      if (response?.result) {
        dispatch(getProductCompany(response?.result?.companyId));
        dispatch({
          type: REDUCER.GET_USER_PROFILE_SUCCESS,
          payload: response,
        });
        dispatch({
          type: ACTION_TYPES.USER_PROFILE_SUCCESS1,
          payload: profileData,
        });

        if (isLoginFlow) {
          navigateTo("AppointmentScreen", { screen: "Appointment" }, true);
        }
      }
      return response;
    } catch (error) {
      console.log("in the error", error);
      store.dispatch({
        type: ACTION_TYPES.USER_PROFILE_FAILED1,
      });
    }
  };

export const getUserProfile =
  (email, password, fcmToken, deviceId, setLoading) => (dispatch) => {
    const data = {
      grant_type: "password",
      username: email,
      password: password,
      client_id: "id-cc71a24b-bc2e-268a-658a-8b9b2b382537",
      client_secret: "secret-cc526fe7-60b1-8c18-451e-51d2c12a6519",
    };
    return axios
      .post(`${BASE_URL}${API.GETACESSTOKEN}`, qs.stringify(data), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        setTokens(response.data.access_token, response.data.refresh_token);
        let isLoginFlow = true;
        dispatch(getProfileData(isLoginFlow));
      })
      .catch((error) => {
        console.log("in the error", error);
        Alert.alert(
          error
            ? "Please log in to Rxtro and complete your registration"
            : "Something went wrong",
          "",
          [
            {
              text: "OK",
              onPress: () => {
                setLoading(false);
              },
            },
          ]
        );
      });
  };

export function getUserProfileLoading() {
  return (dispatch) => dispatch({ type: REDUCER.GET_USER_PROFILE_LOADING });
}
