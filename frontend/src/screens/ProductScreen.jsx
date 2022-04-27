import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../store/Context";

const ProductScreen = () => {
  const params = useParams();
  const productId = params.id;

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [selectArray, setSelectArray] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);

  const { add } = useContext(CartContext);

  const handleProductQuantity = (e) => {
    setProductQuantity(+e.target.value);
  };

  useEffect(() => {
    const getProductInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/products/${productId}`
        );
        const fetchedProduct = response.data;
        setProduct(fetchedProduct);
        const { countInStock } = fetchedProduct;

        setSelectArray([...Array(countInStock).keys()]);

        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    getProductInfo();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <StyledProductScreen>
      <ProductScrenLeft>
        <ProductScreenLeftImage>
          <img src={product?.imageUrl} alt="productName" />
        </ProductScreenLeftImage>
        <ProductLeftInfo>
          <ProductLeftName>{product?.name}</ProductLeftName>
          <p>Price: ${product?.price}</p>
          <p>{product?.description}</p>
        </ProductLeftInfo>
      </ProductScrenLeft>
      <ProductScrenRight>
        <ProductRightInfo>
          <p>
            Price: <span>${product?.price}</span>
          </p>
          <p>
            Status: <span>In Stock</span>
          </p>
          <p>
            Quantity
            <select onChange={handleProductQuantity}>
              {selectArray.map((x) => (
                <option key={x + 1} value={`${x + 1}`}>{`${x + 1}`}</option>
              ))}
            </select>
          </p>
          <p>
            <button
              type="button"
              onChange={handleProductQuantity}
              onClick={() => {
                add({ product, quantity: productQuantity });
              }}
            >
              Add to Cart
            </button>
          </p>
        </ProductRightInfo>
      </ProductScrenRight>
    </StyledProductScreen>
  );
};

export default ProductScreen;
const StyledProductScreen = styled.div`
  max-width: 1300px;
  margin: 1rem auto;
  display: flex;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const ProductScrenLeft = styled.div`
  display: flex;
  flex: 0.8;
  @media (max-width: 960px) {
    flex-direction: column;
    flex: 1;
  }
`;
const ProductScreenLeftImage = styled.div`
  margin: 1rem;
  flex: 0.6;
  @media (max-width: 960px) {
    flex: 1;
  }
`;
const ProductLeftInfo = styled.div`
  margin: 1rem;
  flex: 0.4;
  background: #ffffff;
  height: fit-content;
  font-size: 0.9rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  > p {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    :last-child {
      border: none;
    }
  }
  @media (max-width: 960px) {
    flex: 1;
  }
`;
const ProductLeftName = styled.p`
  font-weight: bold;
  font-size: 1.3rem;
`;
const ProductScrenRight = styled.div`
  flex: 0.2;
  @media (max-width: 960px) {
    flex: 1;
    padding: 1rem;
  }
`;
const ProductRightInfo = styled.div`
  width: 250px;
  margin: 1rem;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  select {
    padding: 10px 16px;
  }
  > p {
    padding: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    > button {
      grid-column: 1/-1;
      padding: 10px 16px;
      background-color: #171717;
      color: #f3f3f3;
      cursor: pointer;
      border: none;
      border-radius: 8px;

      :hover {
        background-color: #232121;
      }
    }
    :last-child {
      border: none;
    }
  }
  @media (max-width: 960px) {
    width: 100%;
    padding: 1rem;
    margin: 0;
  }
`;
