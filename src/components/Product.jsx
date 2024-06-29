import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components'


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  width: calc(25% - 20px); /* 25% width minus margin */
  margin: 10px; /* Adjust as needed */
  min-height: 280px;
  height: 350px;
  position: relative;
  background-color: #f5fbfd;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 70%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;



const Icon = styled.div`
  width: 40%;
  heigth: 40%;
  border-radius: 60%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {
  return (
    <Container>
       <Circle/>
       <Image src={item.img} alt={item.img}/>
       <Info>
           <Icon>
               <ShoppingCartOutlined/>
           </Icon>
           <Icon>
               <Link to = {`/product/${item._id}`}>
               <SearchOutlined/>
               </Link>
           </Icon>
           <Icon>
               <FavoriteBorderOutlined/>
           </Icon>
       </Info>
    </Container>
  )
}

export default Product
