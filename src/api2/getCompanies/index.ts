import { BASE_URL } from './../../constants/api/index';
import {get} from '..';
import {API} from '../../constants/api';

export const getAllCompanies = async () => {
  try {
    const response = await get({
      path: `https://au.rxtro.com/api/jsonws/wx.representative/get-company-list`,
      params: {},
      noLoader: true,
    });
    return response; // Return the response for further use
  } catch (error) {
    console.error("Error fetching companies:", error);
  }
};
