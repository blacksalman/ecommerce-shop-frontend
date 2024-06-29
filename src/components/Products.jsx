import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Product from './Product'; 
import { BASE_URL } from '../requestMethods'; 

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = cat
          ? `${BASE_URL}/api/products/all_product/?category=${cat}`
          : `${BASE_URL}/api/products/all_product`;

        const response = await axios.get(url);
        setProducts(response.data?.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [cat]);

  useEffect(() => {
    if (!cat) {
      // No category filter applied, show all products
      setFilteredProducts(products);
    } else {
      // Apply filters based on category and other criteria
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    }
  }, [products, cat, filters]);

  useEffect(() => {
    // Apply sorting based on sort criteria
    if (sort === 'newest') {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    } else if (sort === 'asc') {
      setFilteredProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {filteredProducts.map((item) => (
        <Product item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Products;
