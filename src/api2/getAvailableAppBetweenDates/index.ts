import {get} from '..';
import {BASE_URL} from '../../constants/api';

/**
 * Fetch available take apps for a representative within a territory over a specific date range.
 *
 * @param {string|number} userId - The ID of the user.
 * @param {string} territoryId - The ID of the territory.
 * @param {Object} options - Additional options for the API request.
 * @param {string} options.from - The start date in 'yyyy-MM-dd' format.
 * @param {string} options.to - The end date in 'yyyy-MM-dd' format.
 * @param {string} [options.stateId] - Optional state ID.
 * @param {string} [options.blockId] - Optional block ID.
 * @param {string} [options.scheduleType] - Optional schedule type ('Group' or 'Individual').
 * @param {string} [options.automatic] - Optional flag ('True' or 'False').
 * @returns {Promise<Object>} - The API response.
 */
export const getAvailableAppBetweenDates = async (
  userId,
  territoryId,
  {from, to, stateId, blockId, scheduleType, automatic},
) => {
  try {
    const params = {
      from,
      to,
      ...(stateId && {stateId}),
      ...(blockId && {blockId}),
      ...(scheduleType && {scheduletype: scheduleType}),
      ...(automatic && {automatic}),
    };

    const response = await get({
      path: `${BASE_URL}/o/representative-app/${userId}/territory/${territoryId}/available-take-apps`,
      params,
      noLoader: true,
    });

    console.log('in the response:', response);
    return response;
  } catch (error) {
    console.log('errors', error);
    throw error;
  }
};
