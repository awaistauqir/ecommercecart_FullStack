import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import Product from "../Components/Product";

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await axios.get(
          "http://localhost:5000/products"
        );

        setProducts(fetchedProducts.data);
        console.log(products);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, []);

  return (
    <StyledHomeScreen>
      <HomeScreenTitle>Latest Products</HomeScreenTitle>
      <HomeScreenProducts>
        {loading ? (
          <p>Loading.....</p>
        ) : (
          products.map((product) => (
            <Product
              key={product._id}
              name={product.name}
              price={product.price}
              description={product.description}
              id={product._id}
              imageUrl={product.imageUrl}
            />
          ))
        )}
      </HomeScreenProducts>
    </StyledHomeScreen>
  );
};

export default HomeScreen;
const StyledHomeScreen = styled.div`
  max-width: 1300px;
  margin: 1rem auto;
`;
const HomeScreenTitle = styled.h2`
  font-size: 1.5rem;
  color: #171717;
  margin-bottom: 1rem;
  margin-left: 8px;
`;
const HomeScreenProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 1232px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 922px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 630px) {
    grid-template-columns: 1fr;
  }
`;
