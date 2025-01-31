// actions.js

import {START_LOADER, STOP_LOADER} from './actionType';

export const startLoader = () => ({
  type: START_LOADER,
});

export const stopLoader = () => ({
  type: STOP_LOADER,
});
