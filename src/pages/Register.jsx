import styled from 'styled-components'
import { useState } from 'react';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';
// import { publicRequest } from "../requestMethods"
// import {useSelector, useDispatch} from 'react-redux'
import { BASE_URL } from '../requestMethods'; 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  ),
   url('https://img.freepik.com/free-photo/shallow-bokeh-display-scene-business_1253-474.jpg?t=st=1648186224~exp=1648186824~hmac=420f55d238a77247e32255e15f360a64c36f69b52ddd1fd11412f76aa6ecf9a7&w=900') center;
    
  display: flex;
  align-items: center;
  justify-content: center;
   `;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #ffe5b4;
  ${mobile({ width: '75%'})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 20px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;


const Register = () => {

  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const bodyData = {
    fullName,
    username,
    email,
    password
  }
  const handleFormClick = async (e) => {
    e.preventDefault()
    // const res = await fetch(`http://localhost:5000/api/auth/register`, {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData)
    });

    const resData = await res.json();


    const status = resData.status;
    if(status){
      navigate('/login');
    }
  };

  
  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>
            <Form>
                <Input placeholder='Full Name' name='fullName' onChange={(e)=>setFullName(e.target.value)}/>
                <Input placeholder='Username' name='username' onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder='Email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <Input placeholder='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <Agreement>
                    By creating an account , I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                </Agreement>
                <Button onClick={handleFormClick}>CREATE</Button>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register