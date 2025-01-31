import api from '../api';
import {REDUCER} from '../constants';

type args = {
  orgId: number
}

export const getTeams = ({orgId}: args) => dispatch => {
  try {
    api.get('wx.representative/get-active-child-orgs', {orgId: orgId}).then(res => {
      if (res) {
        dispatch({
          type: REDUCER.GET_TEAMS_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({
          type: REDUCER.GET_TEAMS_FAILED,
          payload: res,
        });
      }
    })
  } catch (error) {
    dispatch({
      type: REDUCER.GET_TEAMS_FAILED,
      payload: error,
    })
  }
}

export function getTeamsLoading() {
  return dispatch => dispatch({type: REDUCER.GET_TEAMS_LOADING});
}
