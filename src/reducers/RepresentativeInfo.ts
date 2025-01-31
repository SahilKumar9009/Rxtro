// userProfileReducer.js
export const ACTION_TYPES = {
  USER_PROFILE_SUCCESS1: 'USER_PROFILE_SUCCESS',
  USER_PROFILE_FAILED1: 'USER_PROFILE_FAILED',
};

// Define the initial state structure
const initialState = {
  userProfile: {
    result: {
      companyId: 0,
      companyName: '',
      emailAddress: '',
      firstName: '',
      jobTitle: '',
      lastName: '',
      phone: '',
      portraitId: 0,
      portraitUrl: '',
      repStatus: 0,
      representativeId: 0,
      subscriptionName: '',
      userId: 0,
      userStatus: 0,
    },
    success: false,
  },
};

// Reducer function to handle actions
export default function userProfileReducer2(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.USER_PROFILE_SUCCESS1:
      return {
        ...state,
        userProfile: {
          result: action.payload,
          success: true,
        },
      };

    case ACTION_TYPES.USER_PROFILE_FAILED1:
      return {
        ...state,
        userProfile: {
          result: initialState.userProfile.result,
          success: false,
        },
      };

    default:
      return state;
  }
}
