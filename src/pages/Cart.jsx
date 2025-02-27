import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { Add, Remove } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../redux/userRedux';
import AskSignIn from './AskSignIn';


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px'})}

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
   padding: 10px;
   font-weight: 600;
   cursor: pointer;
   border: ${props=>props.type === 'filled' && 'none'};
   background-color: ${props=>props.type === 'filled' ? 'black' : 'transparent'};
   color: ${props=>props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none'})}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor:pointer;
  margin: 0px 10px;
 
`;

const Bottom = styled.div`
   display: flex;
   justify-content: space-between;
   ${mobile({ padding: '5px 1px', flexDirection: 'column'})}
   cursor: pointer;
`;

const Information = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column'})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  padding: 10px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.span`
  
`;

const ProductId = styled.span``;

const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props=>props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  justify-content: center;
  ${mobile({ textAlign: 'center'})}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  ${mobile({ padding: '0px 5px' , marginTop:'5px'})}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: '5px 15px'})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
  ${mobile({ marginBottom: '20px'})}
`;

const Hr = styled.hr`
  padding: 10px;
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === 'total' && '500'};
  font-size: ${props=>props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span`
  
`;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;


const Cart = () => {
  const cart = useSelector((state)=> state.cart)
  const [stripeToken,setStripeToken] = useState(null);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const onToken = (token) => {
    setStripeToken(token)   
  };


  useEffect(() => {
    const makeRequest = async () => {
      try{
        const res = await userRequest.post('/api/checkout/payment',{
          tokenId:stripeToken.id,
          amount:cart.total*100,
        });
        navigate("../success", { data: res.data })

      }catch{}
    };
    stripeToken && makeRequest()

  },[stripeToken,cart.total, navigate])

  const handleShoppingContinue = (e) => {
    e.preventDefault();
    navigate('/shoppingcart')
  }

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        { user ? <>
        <Wrapper>
            <Title>YOUR BAG</Title>
            <Top>
                <TopButton onClick={handleShoppingContinue}>Back Cartpage</TopButton>
                <TopTexts>
                    <TopText>Shopping Bag({cart.quantity})</TopText>
                </TopTexts>
                <TopButton type='filled'>CHECKOUT NOW</TopButton>
            </Top>
            <Bottom>
                <Information>
                {cart.products.map((product) => (
              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>
                    Rs {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}

                <Hr/>
                    
                </Information>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>SubTotal</SummaryItemText>
                        <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping</SummaryItemText>
                        <SummaryItemPrice>Rs 40.00</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem>
                        <SummaryItemText>Shipping Discount</SummaryItemText>
                        <SummaryItemPrice>Rs -150.00</SummaryItemPrice>
                    </SummaryItem>

                    <SummaryItem  type='total'>
                        <SummaryItemText>Total</SummaryItemText>
                        <SummaryItemPrice>Rs {cart.total}</SummaryItemPrice>
                    </SummaryItem>
 
            <StripeCheckout
              name="shopping app"
              image="https://cdn.vectorstock.com/i/1000x1000/67/76/online-shopping-app-application-logo-design-vector-40706776.webp"
              billingAddress
              shippingAddress
              description={`Your total is Rs ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper> 
        </>
        : 
        <>
        <Wrapper> 
          <AskSignIn/>
        </Wrapper>
        </>
        }   
        <Footer/>
    </Container>
  )
}

export default Cart