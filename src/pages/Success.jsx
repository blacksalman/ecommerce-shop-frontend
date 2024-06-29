import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { removeProduct } from '../redux/cartRedux';

// import DeleteIcon from '@mui/icons-material/Delete';
// import Homes from "./Homes";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 230px;
`;


const Success = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/');
        dispatch(removeProduct());

    }
    
    return(
        <Container>
            <span>Your payment has been successfull</span>
            {/* <Button>Home</Button> */}
            <Button variant="outlined" startIcon={<Home />} onClick={handleClick}>
               Home
            </Button>
        </Container>
        
    )

}

export default Success;