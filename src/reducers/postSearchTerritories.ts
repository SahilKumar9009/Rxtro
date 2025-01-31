import {REDUCER} from '../constants';

const initialState ={
  searchResults: [],
  loading: false,
  searchText: "",
  numberOfResults: 0
}

export default function postSearchTerritoriesReducer(state = initialState, action) {
  switch (action.type) {
    case REDUCER.POST_SEARCH_TERRITORIES_LOADING:
      return {...state, loading: true};
    case REDUCER.POST_SEARCH_TERRITORIES_SUCCESS:
      return {
        ...state,
        searchResults: action.payload,
        loading: false,
        numberOfResults: 0,
        searchText: action.searchTerm,
      };
    case REDUCER.POST_SEARCH_TERRITORIES_FAILED:
      return {
        ...state,
        searchResults: [],
        loading: false
      };
    case REDUCER.RESET_SEARCHED_TERRITORIES:
      return {
        ...state,
        searchResults: [],
        loading: false,
        numberOfResults: 0,
      }
    default:
      return state;
  }
}