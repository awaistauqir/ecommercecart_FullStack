import * as actionTypes from "../Constants";

const cartReducer = (cartItems, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const existsItem = cartItems?.find(
        (item) => item.product._id === action.payload.product._id
      );
      if (existsItem) {
        const newCart = cartItems.map((item) =>
          item.product_id === existsItem._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );

        return newCart;
      }

      return [
        ...cartItems,
        { product: action.payload.product, quantity: action.payload.quantity },
      ];
    case actionTypes.REMOVE_FROM_CART:
      return cartItems.filter(
        (item) => item.product._id !== action.payload._id
      );
    case actionTypes.CART_UPDATE:
      const itemIndex = cartItems.findIndex(
        (item) => item.product._id === action.payload.id
      );
      console.log(itemIndex, action.payload.id);
      const newCart = [...cartItems];
      newCart[itemIndex].quantity = action.payload.quantity;
      return newCart;
    default:
      return cartItems;
  }
};
export default cartReducer;
