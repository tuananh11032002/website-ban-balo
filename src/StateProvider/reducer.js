export const reducerCases = {
  SET_PRODUCT: "SET_PRODUCT",
  SET_CATEGORY: "SET_CATEGORY",
  SET_PRODUCTDETAIL: "SET_PRODUCTDETAIL",
  SET_QUANTITY: "SET_QUANTITY",
  SET_ID: "SET_ID",
  SET_CART: "SET_CART",
  SET_USER: "SET_USER",
  SET_LISTUSER: "SET_LISTUSER",
  SET_LOADING: "SET_LOADING",
  SET_CONNECTIONHUB: "SET_CONNECTIONHUB",
  SET_ADDPRODUCT: "SET_ADDPRODUCT",
};
export const initialValues = {
  user: null,
  listUser: null,
  cart: [],
  product: [],
  category: [],
  productdetail: null,
  quantity: 0,
  idTofindProductFromCategory: null,
  loading: false,
  addproduct: false,
  connection: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case reducerCases.SET_CONNECTIONHUB:
      return {
        ...state,
        connection: action.connection,
      };
    case reducerCases.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case reducerCases.SET_ADDPRODUCT:
      return {
        ...state,
        loading: action.addproduct,
      };
    case reducerCases.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case reducerCases.SET_ID:
      return {
        ...state,
        idTofindProductFromCategory: action.id,
      };
    case reducerCases.SET_LISTUSER:
      return {
        ...state,
        listUser: action.listUser,
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
