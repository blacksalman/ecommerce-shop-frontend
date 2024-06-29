import styled from 'styled-components'
import {mobile} from '../responsive'
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
   url('https://img.freepik.com/free-vector/hand-painted-watercolor-abstract-watercolor-background_23-2149012404.jpg?t=st=1648186224~exp=1648186824~hmac=228a2cfa07683743d275b68619c992bb7dddf3488078cc14ec4e918defbbd217&w=900') center;
   
   
  display: flex;
  align-items: center;
  justify-content: center;
   `;

const Wrapper = styled.div`
  width: 6%;
  padding: 20px;
  background-color: rgb(255,207,241,0.5);
  border: none;
  text-align: centre;
  ${mobile({ width: '75%'})}
`;



const AskSignIn = () => {

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };


  
  return (
    <Container>
        <Wrapper>
        <button onClick={navigateToLogin} style={{backgroundColor: "transparent", border: "none"}}>
          Go to Login
        </button>
        </Wrapper>
    </Container>
  )
}

export default AskSignIn


