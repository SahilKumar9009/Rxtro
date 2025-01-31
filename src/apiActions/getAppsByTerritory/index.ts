import axios from 'axios';
import {get} from '../../api2';
import {BASE_URL} from '../../constants/api';

// Define the action type for dispatching
const GET_AVAILABLE_TAKE_APPS = 'GET_AVAILABLE_TAKE_APPS';
const GET_AVAILABLE_TAKE_APPS_ERROR = 'GET_AVAILABLE_TAKE_APPS_ERROR';

// Action Creator with Thunk
export const getAvailableTakeApps = (userId, territoryId) => {
  return async dispatch => {
    try {
      const url = `https://staging.rxtro.com/territory/${territoryId}/available-take-apps`;
      const response = await get({
        path: `${BASE_URL}/o/representative-app/${userId}/territory/${territoryId}/available-take-apps`,
        params: {},
        noLoader: false,
      });
      console.log('get Available Apps By Territory', response);
      // Dispatch successful response
      //   dispatch({
      //     type: GET_AVAILABLE_TAKE_APPS,
      //     payload: response.data,
      //   });
    } catch (error) {
      // Handle error
      console.error('Error fetching available take apps:', error);
      dispatch({
        type: GET_AVAILABLE_TAKE_APPS_ERROR,
        payload: error.message,
      });
    }
  };
};
