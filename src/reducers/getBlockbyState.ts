import {REDUCER} from './../constants/reducerConstant';

const initialState = {
  blocks: [],
  loading: false,
  error: null,
};

const getBlockFilterReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REDUCER.GET_BLOCKS_REQUEST:
      return {...state, loading: true, error: null};
    case REDUCER.GET_BLOCKS_SUCCESS:
      return {...state, loading: false, blocks: action.payload};
    case REDUCER.GET_BLOCKS_FAILURE:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

export default getBlockFilterReducer;
