import api from '../api';
import {REDUCER} from '../constants';

type args = {
  drugRepId: string | null;
  totalPerPage: number;
  pageNumber: number;
};

export const getTerritoryDrugRep =
  ({drugRepId, totalPerPage, pageNumber}: args) =>
  dispatch => {
    try {
  api
        .getAuthorized('wx.territory/get-territory-by-drug-rep-v3', {
          drugRepId,
          totalPerPage,
          pageNumber,
        })
        .then(res => {
          if (res['internal-code'] === 200) {
            dispatch({
              type: REDUCER.GET_TERRITORY_BY_DRUG_REP_SUCCESS,
              payload: res,
            });
          } else {
            dispatch({
              type: REDUCER.GET_TERRITORY_BY_DRUG_REP_FAILED,
              payload: res,
            });
          }
        });
    } catch (error) {
      dispatch({
        type: REDUCER.GET_TERRITORY_BY_DRUG_REP_FAILED,
        payload: error,
      });
    }
  };

export function getTerritoryDrugRepLoading() {
  return dispatch =>
    dispatch({type: REDUCER.GET_TERRITORY_BY_DRUG_REP_LOADING});
}
