import { useContext } from "react";
import styled from "styled-components";

import CartItem from "../Components/CartItem";
import CartContext from "../store/Context";

const CartScreen = () => {
  const { cartItems, getTotalQuantity, getTotalPrice } =
    useContext(CartContext);

  console.log(cartItems);
  return (
    <StyledCartScreen>
      <CartScreenLeft>
        <h2>Shopping Cart</h2>
        {cartItems?.map((cartItem) => (
          <CartItem cartItem={cartItem} key={cartItem.product._id} />
        ))}
      </CartScreenLeft>
      <CartScreenRight>
        <CartScreenInfo>
          <p>Subtotal ({getTotalQuantity()}) items</p>
          <p>${getTotalPrice()}</p>
        </CartScreenInfo>
        <div>
          <button>Proceed to Checkout</button>
        </div>
      </CartScreenRight>
    </StyledCartScreen>
  );
};

export default CartScreen;

const StyledCartScreen = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 2rem auto;
  h2 {
    margin-bottom: 1rem;
  }
  @media (max-width: 900px) {
    max-width: 900px;
  }
  @media (max-width: 960px) {
    max-width: 800px;
    flex-direction: column;
  }
`;
const CartScreenLeft = styled.div`
  flex: 0.7;
  margin-right: 1rem;
  background: transparent;
  padding: 0 1rem;
  @media (max-width: 960px) {
    margin: 0;
    margin-bottom: 15px;
    padding: 0;
  }
`;
const CartScreenRight = styled.div`
  flex: 0.3;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  height: fit-content;
  border-radius: 8px;
  /* margin-top: 60px; */
  button {
    padding: 10px 17px;
    width: 100%;
    color: #f4f4f4;
    background-color: #171717;
    cursor: pointer;
    border: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    :hover {
      opacity: 0.9;
    }
  }
`;
const CartScreenInfo = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  p {
    padding: 8px;
  }
  > div {
    padding: 1rem;
    :last-child {
      border: none;
      button {
        padding: 10px 17px;
      }
    }
  }
`;
