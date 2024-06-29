import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { selectUser } from '../redux/userRedux';
import { mobile } from '../responsive';
import { removeProduct } from '../redux/cartRedux';
import { logoutSuccess } from '../redux/userRedux';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px'})}
`;

const Wrapper = styled.div`
   padding: 10px 20px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   ${mobile({ padding: '10px 0px'})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  ${mobile({ fontSize: '15px'})}
`;

const Right = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  align-item: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center'})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  const cart = useSelector(state => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const totalUniqueProducts = cart.products.length;

  const signIn = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleClickHomePage = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const registerClick = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const signOut = (e) => {
    e.preventDefault();
    dispatch(removeProduct());
    dispatch(logoutSuccess());
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
          <Logo onClick={handleClickHomePage}>Shopping App</Logo>
        </Center>
        <Right>
          {!user ? (
            <>
              <MenuItem onClick={registerClick}>REGISTER</MenuItem>
              <MenuItem onClick={signIn}>SIGN IN</MenuItem>
            </>
          ) : (
            <>
              <MenuItem>{user.user.fullName}</MenuItem>
              <MenuItem onClick={signOut}>SIGN OUT</MenuItem>
            </>
          )}
          <Link to='/checkout'>
            <MenuItem>
              <Badge badgeContent={totalUniqueProducts} color='primary'>
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
