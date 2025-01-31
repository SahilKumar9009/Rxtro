import { BASE_URL } from './../../constants/api/index';
import {post} from '..'; // Ensure this points to the correct post function
import {API} from '../../constants/api'; // Import API constants (if necessary)

const RequestApproval = async (userId, clinicId, body) => {
  try {
    const response = await post({
      path: `${BASE_URL}o/representative-app/${userId}/clinic/${clinicId}/request-apps-with-approval`,
      data: body,
    });

    console.log('in the  Request Approval response', response);
    return response;
  } catch (error) {
    console.error('Error in RequestApproval:', error);
  }
};

export default RequestApproval;
