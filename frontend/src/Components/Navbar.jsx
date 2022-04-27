import styled from "styled-components";
import { useContext } from "react";
import CartContext from "../store/Context";
import { Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
const Navbar = ({ clickButton }) => {
  const { cartItems } = useContext(CartContext);

  const cartNumber = cartItems?.reduce(
    (acc, cartItem) => acc + cartItem.quantity,
    0
  );

  return (
    <StyledNav>
      <NavbarLogo>
        <h2>MERN Shopping Cart</h2>
      </NavbarLogo>
      <NavbarLinks>
        <li>
          <CartLink to="/cart">
            <HiOutlineShoppingCart />
            <span>
              Cart
              <CartLogoBadge>{cartNumber}</CartLogoBadge>
            </span>
          </CartLink>
        </li>
        <li>
          <Link to="/">Shop</Link>
        </li>
      </NavbarLinks>
      <HamburgerMenu onClick={clickButton}>
        <div></div>
        <div></div>
        <div></div>
      </HamburgerMenu>
    </StyledNav>
  );
};

export default Navbar;
const StyledNav = styled.nav`
  width: 100%;
  height: 110px;
  background-color: #171717;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1rem;
  z-index: 1;
`;
const NavbarLogo = styled.div`
  h2 {
    color: #f4f4f4;
    cursor: pointer;
    @media (max-width: 500px) {
      font-size: 1rem;
    }
  }
`;
const NavbarLinks = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  > li {
    padding-left: 1.5rem;
    > a {
      text-decoration: none;
      color: #f4f4f4;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      > span {
        display: flex;
        align-items: center;
        margin-left: 8px;
      }
    }
  }
  @media (max-width: 960px) {
    display: none;
  }
`;
const CartLink = styled(Link)`
  background: #333;
  padding: 10px;
  border-radius: 8px;
  :hover {
    background: #dd219a;
  }
`;
const CartLogoBadge = styled.span`
  width: 30px;
  height: 30px;
  background-color: #f4f4f4;
  border-radius: 50%;
  margin-left: 8px;
  color: #171717;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 1.2rem;
`;
const HamburgerMenu = styled.div`
  width: 30px;
  height: 30px;
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #171717;
  cursor: pointer;
  > div {
    width: 100%;
    height: 3px;
    background: #f4f4f4;
  }
  :hover > div {
    background-color: #dd129e;
  }
  @media (max-width: 960px) {
    display: flex;
  }
`;
