import {REDUCER} from '../constants';

export const startLoader = () => dispatch => {
  dispatch({
    type: REDUCER.START_LOADING,
    payload: {},
  });
};

export const stopLoader = () => dispatch => {
  dispatch({
    type: REDUCER.STOP_LOADING,
    payload: {},
  });
};
