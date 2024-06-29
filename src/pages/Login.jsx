//import { useState } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import { login } from '../redux/apiCalls';
import {mobile} from '../responsive'
import {useSelector, useDispatch} from 'react-redux'


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
  width: 25%;
  padding: 20px;
  background-color: rgb(255,207,241,0.5);
  border: none;
  ${mobile({ width: '75%'})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
   color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();
  const {isFechting, error} = useSelector((state) => state.user);


  const handleClick = async (e)=> {
    e.preventDefault();
    const responseData = await login(dispatch, { email, password });
    if (responseData === undefined) {
      setShowError(true); 
      setTimeout(() => {
        setShowError(false); 
      }, 5000);
    }
    
  }

  
  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <Button onClick={handleClick} disabled={isFechting}>LOGIN</Button>
                {showError && <Error>Somthing went wrong...</Error>}
                <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login


