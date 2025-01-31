import {REDUCER} from '../constants';

const initialState ={
  postResponse: [],
}

export default function postEditProfileReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_EDIT_PROFILE_LOADING:
      return {...state};
    case REDUCER.POST_EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        postResponse: action.payload,
      };
    case REDUCER.POST_EDIT_PROFILE_FAILED:
      return {
        ...state,
        postResponse: [],
      };
    default:
      return state;
  }
}