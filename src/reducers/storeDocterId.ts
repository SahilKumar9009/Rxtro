// individualId.js

// Action Types
export const SET_INDIVIDUAL_ID = 'SET_INDIVIDUAL_ID';
export const CLEAR_INDIVIDUAL_ID = 'CLEAR_INDIVIDUAL_ID';

// Action Creators
export const setIndividualId = id => ({
  type: SET_INDIVIDUAL_ID,
  payload: id,
});

export const clearIndividualId = () => ({
  type: CLEAR_INDIVIDUAL_ID,
});

// Initial State
const initialState = {
  individualId: null,
};

// Reducer
const individualIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INDIVIDUAL_ID:
      return {
        ...state,
        individualId: action.payload,
      };
    case CLEAR_INDIVIDUAL_ID:
      return {
        ...state,
        individualId: null,
      };
    default:
      return state;
  }
};

export default individualIdReducer;
