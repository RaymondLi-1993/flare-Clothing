import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../actions/types";

const INITIAL_STATE = {
  total: 0,
  cart: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        total: action.total,
        cart: action.payload.cart,
      };
    case REMOVE_FROM_CART:
      return { ...state, total: action.total, cart: action.payload.cart };
    case CLEAR_CART:
      return { ...state, total: 0, cart: [] };
    default:
      return state;
  }
};
