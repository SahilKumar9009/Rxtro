import {get} from '../..';
import {API, BASE_URL} from '../../../constants/api';

export const getAvailableCustomer = async (userId, stateId, blockId,suburbId,blocked,added,automatic,name,pageNo,pageSize) => {
  try {
    console.log("in the userId, stateId, blockId,suburbId,blocked,added,automatic,name,pageNo,pageSize",userId, stateId, blockId,suburbId,blocked,added,automatic,name,pageNo,pageSize);
    const response = await get({
      path: `${BASE_URL}${API.ADD_CUSTOMER}${userId}/find-available-customers?stateId=${stateId}&blockId=${blockId}&suburbId=${suburbId}&blocked=${blocked}&added=${added}&automatic=${automatic}&name=${name}&page=${pageNo}&pageSize=${pageSize}`,
      params: {},
      noLoader: true,
    });
    return response;
  } catch (error) {
    console.error('Error fetching blocks:', error);
    throw error;
  }
};
