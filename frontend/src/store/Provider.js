import React from "react";
import { useReducer } from "react";
import cartReducer from "./reducers/CartReducer";
import * as actions from "./Constants";
import CartContext from "./Context";

const CartContextProvider = (props) => {
  const INITIAL_CART_STATE = [];

  const [state, dispatch] = useReducer(cartReducer, INITIAL_CART_STATE);
  const value = {
    cartItems: state,
    add: (item) => {
      dispatch({ type: actions.ADD_TO_CART, payload: item });
    },
    update: (item) => {
      dispatch({ type: actions.CART_UPDATE, payload: item });
    },
    remove: (item) => {
      dispatch({ type: actions.REMOVE_FROM_CART, payload: item });
    },
    getTotalPrice: () => {
      return state.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    },
    getTotalQuantity: () => {
      return state.reduce((acc, item) => acc + item.quantity, 0);
    },
  };
  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

export default CartContextProvider;
