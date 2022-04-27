import styled from "styled-components";
import { Link } from "react-router-dom";
const Product = ({ id, name, description, price, countInStock, imageUrl }) => {
  return (
    <StyledProduct>
      <img src={imageUrl} alt="product_image" />
      <ProductInfo>
        <ProductInfoName> {name}</ProductInfoName>
        <ProductInfoDescription>{description}</ProductInfoDescription>
        <ProductInfoPrice>${price}</ProductInfoPrice>
        <InfoButton to={`/product/${id}`}>View</InfoButton>
      </ProductInfo>
    </StyledProduct>
  );
};

export default Product;
const StyledProduct = styled.div`
  width: 300px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  margin: 8px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > img {
    height: 170px;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  @media screen and (max-width: 1232px) {
    width: 360px;
  }
  @media screen and (max-width: 1115px) {
    width: 330px;
  }
  @media screen and (max-width: 1028px) {
    width: 300px;
  }
  @media screen and (max-width: 950px) {
    width: 400px;
  }
  @media screen and (max-width: 830px) {
    width: 330px;
  }
  @media screen and (max-width: 700px) {
    width: 290px;
  }
  @media screen and (max-width: 630px) {
    width: 450px;
  }
  @media screen and (max-width: 500px) {
    width: 350px;
  }
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ProductInfoName = styled.p`
  font-size: 1rem;
  overflow: hidden;
`;
const ProductInfoDescription = styled.p`
  font-size: 0.8rem;
`;
const ProductInfoPrice = styled.p`
  font-weight: bold;
`;
const InfoButton = styled(Link)`
  display: block;
  width: 100%;
  text-decoration: none;
  text-align: center;
  color: #171717;
  background-color: #f3f3f3;
  padding: 8px 16px;
  border: 1px solid #171717;
  font-size: 1rem;
  border-radius: 10px;
  :hover {
    background-color: #171717;
    color: #f3f3f3;
  }
`;
