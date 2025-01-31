// import {getAvailableAppBetweenDates} from '../../api2/getAvailableAppBetweenDates';
// import {REDUCER} from '../../constants';
// import {AppThunk} from '../interface';

// // /**
// //  * Thunk action to fetch available take apps by territory and dispatch result to Redux store.
// //  *
// //  * @param {string|number} userId - The ID of the user.
// //  * @param {string} territoryId - The ID of the territory.
// //  * @param {Object} options - Additional options for the API request.
// //  * @param {string} options.from - The start date in 'yyyy-MM-dd' format.
// //  * @param {string} options.to - The end date in 'yyyy-MM-dd' format.
// //  * @param {string} [options.stateId] - Optional state ID.
// //  * @param {string} [options.blockId] - Optional block ID.
// //  * @param {string} [options.scheduleType] - Optional schedule type ('Group' or 'Individual').
// //  * @param {string} [options.automatic] - Optional flag ('True' or 'False').
// //  * @returns {AppThunk}
// //  */
// export const fetchAppsByTerritory =
//   (userId, territoryId, options): AppThunk =>
//   async dispatch => {
//     try {
//       const response = await getAvailableAppBetweenDates(
//         userId,
//         territoryId,
//         options,
//       );
//       console.log('Fetched apps by territory:', response);
//     } catch (error) {
//       console.error('Error fetching apps by territory:', error);
//     }
//   };
