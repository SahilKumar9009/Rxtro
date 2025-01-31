import { BASE_URL } from './../../constants/api/index';
import {get} from '..';
import {API} from '../../constants/api';
import { REDUCER } from '../../constants';

// wx.representative/get-active-child-orgs?orgId=169511
export const getTeams = async (orgId) => {
    orgId = 169511;
  try {
    const response = await get({
      path: `https://au.rxtro.com/api/jsonws/wx.representative/get-active-child-orgs?orgId=${orgId}`,
      params: {},
      noLoader: true,
    });
    console.log("Response from get Teams:", response);
    
    return response; // Return the response for further use
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};
