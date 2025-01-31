
export const SET_USER_DATA = "SET_USER_DATA";


export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
});

const initialState = {
  accountStatus: "",
  companyId: null,
  isPremium: false,
  logoId: null,
  name: "",
  parentId: null,
  parentName: "",
  products: [],
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      console.log('in the product reducer', action.payload);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
