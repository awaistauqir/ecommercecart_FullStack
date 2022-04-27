import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import CartContext from "../store/Context";
import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
const CartItem = ({ cartItem }) => {
  const { remove, update } = useContext(CartContext);

  const handleCartChange = (e) => {
    console.log(+e.target.value);

    update({ id: cartItem.product._id, quantity: +e.target.value });
  };
  return (
    <StyledCartItem>
      <CartItemImage>
        <img src={cartItem.product.imageUrl} alt="" />
      </CartItemImage>
      <CartItemName to={`/product/${cartItem.product._id}`}>
        <p>{cartItem.product.name}</p>
      </CartItemName>
      <CartItemPrice>${cartItem.product.price}</CartItemPrice>

      <CartItemSelect value={cartItem.quantity} onChange={handleCartChange}>
        {[...Array(cartItem.product.countInStock).keys()].map((x) => (
          <option key={uuidv4()} value={`${x + 1}`}>{`${x + 1}`}</option>
        ))}
      </CartItemSelect>

      <DeleteButton
        onClick={() => {
          remove(cartItem.product);
        }}
      >
        <BsTrash />
      </DeleteButton>
    </StyledCartItem>
  );
};

export default CartItem;
const StyledCartItem = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 8px;
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 1fr 1fr;
  gap: 8px;
  background-color: #fff;
  border-radius: 2px;
  place-items: center;
  text-align: center;
`;
const CartItemImage = styled.div``;
const CartItemName = styled(Link)`
  text-decoration: none;
  color: #171717;
  :hover {
    color: #dd219e;
  }
`;
const CartItemPrice = styled.p`
  font-size: 0.8rem;
  @media (max-width: 500px) {
    font-size: 0.6rem;
  }
`;
const CartItemSelect = styled.select`
  padding: 10px 17px;
  cursor: pointer;
  @media (max-width: 700px) {
    padding: 8px 13px;
  }
  @media (max-width: 500px) {
    padding: 5px 8px;
  }
`;
const DeleteButton = styled.button`
  padding: 10px 17px;
  color: red;
  background-color: #f4f4f4;
  border: 1px solid #171717;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    background: #171717;
    transform: scale(1.2);
  }
  @media (max-width: 700px) {
    padding: 8px 13px;
  }
  @media (max-width: 500px) {
    padding: 5px 8px;
  }
`;
