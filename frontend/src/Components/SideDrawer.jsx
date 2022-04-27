import styled from "styled-components";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../store/Context";
const SideDrawer = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  const cartNumber = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );
  return (
    <StyledSideDrawer>
      <SideDrawerLinks>
        <li>
          <StyledLinkTag to="/cart">
            <HiOutlineShoppingCart />
            <span>
              <span>Cart</span>
              <SideDrawerCartBadge>{cartNumber}</SideDrawerCartBadge>
            </span>
          </StyledLinkTag>
        </li>
        <li>
          <StyledLinkTag to="/">
            <span>Shop</span>
          </StyledLinkTag>
        </li>
      </SideDrawerLinks>
    </StyledSideDrawer>
  );
};

export default SideDrawer;
const StyledSideDrawer = styled.div`
  width: 70%;
  height: 100vh;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  transform: translateX(${(props) => props.theme.showDrawer});
  transition: transform 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 960px) {
    display: none;
  }
`;
const SideDrawerLinks = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
`;
const SideDrawerCartBadge = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #171717;
  color: #f3f3f3;
  margin-left: 8px;
`;
const StyledLinkTag = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
  width: 100%;
  padding: 1rem;
  text-decoration: none;
  color: #171717;
  font-size: 1.6rem;

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8px;
  }
  :hover {
    background-color: #171717;
    color: #f3f3f3;
    ${SideDrawerCartBadge} {
      color: #171717;
      background-color: #f3f3f3;
    }
  }
`;
