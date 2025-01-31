import axios from 'axios';

// Define action types
const GET_AVAILABLE_TAKE_APPS = 'GET_AVAILABLE_TAKE_APPS';
const GET_AVAILABLE_TAKE_APPS_ERROR = 'GET_AVAILABLE_TAKE_APPS_ERROR';

// Action creator using Thunk
export const getAvailableTakeApps = (
  userId,
  token,
  queryParams,
  requestBody,
) => {
  return async dispatch => {
    try {
      const url = `BASEUrl/o/representative-app/${userId}/available-take-apps`;

      const response = await axios.get(url, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: requestBody, // Sending the request body for territoryIds
      });

      // Dispatch the successful response
      dispatch({
        type: GET_AVAILABLE_TAKE_APPS,
        payload: response.data,
      });
    } catch (error) {
      // Dispatch error response
      console.error('Error fetching available take apps:', error);
      dispatch({
        type: GET_AVAILABLE_TAKE_APPS_ERROR,
        payload: error.message,
      });
    }
  };
};
