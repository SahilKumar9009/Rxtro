import {CustomerIO} from 'customerio-reactnative';
import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null;
  searchTerm: string;
  regionId: number;
  suburbId: number;
  sizeResult: number;
};

export const postSearchTerritories =
  ({drugRepId, searchTerm, regionId, suburbId, sizeResult}: args) =>
  dispatch => {
    try {
      api
        .postAuthorizedFormData('wx.surgery/search-territories', {
          drugRepId,
          searchTerm,
          regionId,
          suburbId,
          sizeResult,
        })
        .then(res => {
          if (res['internal-code'] === 200) {
            CustomerIO.track('territory-search', {
              searchTerm,
            });
            dispatch({
              type: REDUCER.POST_SEARCH_TERRITORIES_SUCCESS,
              payload: res,
              searchTerm: searchTerm,
            });
          } else {
            dispatch({
              type: REDUCER.POST_SEARCH_TERRITORIES_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.POST_SEARCH_TERRITORIES_FAILED,
        payload: error,
      });
    }
  };

export function postSearchTerritoriesLoading() {
  return dispatch => dispatch({type: REDUCER.POST_SEARCH_TERRITORIES_LOADING});
}

export function resetSearchedTerritories() {
  return dispatch => dispatch({type: REDUCER.RESET_SEARCHED_TERRITORIES});
}
