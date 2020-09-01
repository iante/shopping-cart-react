import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = (
    //JSON.parse converts string to json set in localStorage
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
