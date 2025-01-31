import {API} from './../constants/api/index';
import axios from 'axios';
import api from '../api';
import {REDUCER} from '../constants';
import {BASE_URL} from '../constants/api';
import {Alert} from 'react-native';

type args = {
  mobilePhone: string;
  email: string;
  firstLineProducts: string;
  secondLineProducts: string;
  thirdLineProducts: string;
  companyId: number;
  firstName: string;
  lastName: string;
};

export const postAddDrugRepresentative =
  ({
    mobilePhone,
    email,
    firstLineProducts,
    secondLineProducts,
    thirdLineProducts,
    companyId,
    firstName,
    lastName,
  }: args) =>
  dispatch => {
    try {
      api
        .postData('wx.representative/add-drug-representative', {
          mobilePhone,
          email,
          firstLineProducts,
          secondLineProducts,
          thirdLineProducts,
          companyId,
          firstName,
          lastName,
          countryId: '32',
        })
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.POST_ADD_DRUG_REPRESENTATIVE_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.POST_ADD_DRUG_REPRESENTATIVE_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_ADD_DRUG_REPRESENTATIVE_FAILED,
        payload: error,
      });
    }
  };

export const RegisterRepresentative = async (
  mobilePhone,
  email,
  firstName,
  lastName,
  navigation,
) => {
  try {
    const queryParams = new URLSearchParams({
      firstName,
      lastName,
      email,
      mobilePhone,
    }).toString();

    const url = `${BASE_URL}${API.CREATEACCOUNT}${queryParams}`;
    const response = await axios.put(url);
    Alert.alert(
      'Profile created Successfully',
      '',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('LoginScreen'),
        },
      ],
      {cancelable: false},
    );
    return response.data;
  } catch (error) {
    // console.log('IN THE SIGNUP ERROR', error);
    throw error;
  }
};
export function postAddDrugRepresentativeLoading() {
  return dispatch =>
    dispatch({type: REDUCER.POST_ADD_DRUG_REPRESENTATIVE_LOADING});
}
