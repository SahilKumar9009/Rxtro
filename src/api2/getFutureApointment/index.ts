// actions/appointmentActions.js

import axios from 'axios';
import {REDUCER} from '../../constants';
import {get} from '..';

export const fetchFutureAppointments = (userId, from, to) => {
  return async dispatch => {
    dispatch({type: REDUCER.GET_FUTURE_APPOINTMENTS_LOADING});

    try {
      const response = get({
        path: '/o/representative-app/54486/appointment?from=2024-07-15&to=2024-07-22',
        params: {},
        noLoader: false,
      });
      if (response) {
        dispatch({
          type: REDUCER.GET_FUTURE_APPOINTMENTS_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: REDUCER.GET_FUTURE_APPOINTMENTS_FAILED,
        payload: error.message,
      });
    }
  };
};
