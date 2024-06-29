import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { selectUser } from '../redux/userRedux';
import { useDispatch } from 'react-redux';
import { removeSingleProduct, updateProductQuantity } from '../redux/cartRedux';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const ProductId = styled.span`
  font-size: 14px;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 5px 0;
`;

const ProductSize = styled.span`
  font-size: 14px;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const QuantityButton = styled.div`
  cursor: pointer;
`;

const ProductAmount = styled.span`
  font-size: 24px;
  margin: 0 10px;
`;

const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 300;
`;

const RemoveProduct = styled.div`
  cursor: pointer;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: black;
  color: white;
  margin-top: 20px;
`;

const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const [products, setProducts] = useState(cart.products);
  // const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  // const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(cart.products);
  }, [cart.products]);

  const handleShoppingContinue = () => {
    navigate('/checkout');
  };

  const handleClickRemoveProduct = (productId) => {
    dispatch(removeSingleProduct({ _id: productId }));
  };


    const handleQuantityChange = (type, productId) => {
        const updatedProducts = products.map((product) => {
        if (product._id === productId) {
            if (type === 'inc') {
            dispatch(updateProductQuantity({ productId, quantity: product.quantity + 1 }));
            return { ...product, quantity: product.quantity + 1 };
            } else if (type === 'dec' && product.quantity > 1) {
            dispatch(updateProductQuantity({ productId, quantity: product.quantity - 1 }));
            return { ...product, quantity: product.quantity - 1 };
            }
        }
        return product;
        });

        setProducts(updatedProducts);
   };

  const handleToHomePage = (e) => {
    e.preventDefault();
    navigate('/')
  }

  return (
    <Container>
        <Navbar />
        <Announcement />
        <TopButton onClick={handleToHomePage}>Back To Home</TopButton>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <ProductContainer>
            {products.map((product) => (
                <Product key={product._id}>
                <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                    <ProductName>{product.title}</ProductName>
                    <ProductId>ID: {product._id}</ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>Size: {product.size}</ProductSize>
                    </Details>
                </ProductDetail>
                <PriceDetail>
                    <ProductAmountContainer>
                    <QuantityButton onClick={() => handleQuantityChange('dec', product._id)}><Remove /></QuantityButton>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <QuantityButton onClick={() => handleQuantityChange('inc', product._id)}><Add /></QuantityButton>
                    </ProductAmountContainer>
                    <ProductPrice>Rs {product.price * product.quantity}</ProductPrice>
                    <RemoveProduct onClick={() => handleClickRemoveProduct(product._id)}>Remove</RemoveProduct>
                </PriceDetail>
                </Product>
            ))}
            </ProductContainer>
            <TopButton onClick={handleShoppingContinue}>CHECKOUT NOW</TopButton>
        </Wrapper>
        <Footer />
    </Container>
  );
};

export default ShoppingCart;
