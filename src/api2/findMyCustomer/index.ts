import axios from 'axios';
import { get } from '..';
import { API, BASE_URL } from '../../constants/api';
import { getTokens } from '../../methods/tokens';

export const findMyCustomer = async (
  userId,
  stateId,
  blockId,
  name,
  pageNo,
  pageSize,
  automatic = 2,
  booked = 2 
) => {
  try {
    console.log("in the userId, stateId, blockId, name, pageNo, pageSize, automatic, booked",userId, stateId, blockId, name, pageNo, pageSize, automatic, booked);
    const response = await get({
      path: `${BASE_URL}o/rep-territory/${userId}/find-my-customers?stateId=${stateId}&blockId=&automatic=${automatic}&name=${name}&booked=${booked}&page=${pageNo}&pageSize=${pageSize}`,
      noLoader: false,
    });

    console.log("API Response:", response);
    return response;
  } catch (error) {
    console.log('errors', error);
  }
};