import axios from 'axios';

const SWAP_APPOINTMENT = 'SWAP_APPOINTMENT';
const SWAP_APPOINTMENT_ERROR = 'SWAP_APPOINTMENT_ERROR';

export const swapAppointment = (userId, appId, token, queryParams) => {
  return async dispatch => {
    try {
      const url = `{{url}}/o/representative-app/${userId}/swap-appointment/${appId}`;

      const response = await axios.post(url, null, {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error swapping appointment:', error);
    }
  };
};
