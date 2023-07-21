export const reducerCases = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_CATEGORY: "SET_CATEGORY",
  SET_PRODUCTDETAIL: "SET_PRODUCTDETAIL",
  SET_QUANTITY: "SET_QUANTITY",
  SET_ID: "SET_ID",
  SET_CART: "SET_CART",
};
export const initialValues = {
  cart: [],
  product: [],
  category: [],
  productdetail: null,
  quantity: 0,
  idTofindProductFromCategory: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_ID:
      return {
        ...state,
        idTofindProductFromCategory: action.id,
      };
    case reducerCases.SET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case reducerCases.SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    case reducerCases.SET_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    case reducerCases.SET_PRODUCTDETAIL:
      return {
        ...state,
        productdetail: action.productdetail,
      };
    case reducerCases.SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity,
      };
    default:
      return state;
  }
};
export default reducer;
