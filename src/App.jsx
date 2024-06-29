import Product from './pages/Product'
import Homes from "./pages/Homes";
import ProductList from "./pages/ProductList";
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import AskSignIn from './pages/AskSignIn';
import Success from './pages/Success';
import {useSelector} from 'react-redux'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ShoppingCart from './components/ShoppingCart';

const App = () => {
  const user = useSelector(state=> state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homes />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login"  element={ user ? < Navigate to = "/"/> :<Login />} />
        <Route path="/cart"  element={ user ? < Navigate to = "/"/> :<AskSignIn />} />
        <Route path="/register" element={ user ? < Navigate to = "/"/> :<Register />} />
        <Route path="/shoppingcart" element={ user ? <ShoppingCart />: <AskSignIn />} />
      </Routes>
    </Router>
  );
};

export default App;