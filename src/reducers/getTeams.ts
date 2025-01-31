import {REDUCER} from '../constants';

const initialState ={
  teams: [],
}

export default function getTeamsReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.GET_TEAMS_LOADING:
      return {...state};
    case REDUCER.GET_TEAMS_SUCCESS:
      return {
        ...state,
        teams: action.payload,
      };
    case REDUCER.GET_TEAMS_FAILED:
      return {
        ...state,
        teams: [],
      };
    default:
      return state;
  }
}