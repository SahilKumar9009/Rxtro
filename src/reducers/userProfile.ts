import {REDUCER} from '../constants';

const initialState = {
  userProfile: [],
  loading: false,
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_USER_PROFILE_LOADING:
      return {...state, loading: true};
    case REDUCER.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case REDUCER.GET_USER_PROFILE_FAILED:
      return {
        ...state,
        userProfile: [],
        loading: false,
      };
    default:
      return state;
  }
}
