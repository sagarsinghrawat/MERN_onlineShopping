import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route } from  'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Header from './component/Header';
import Footer from './component/Footer';
import HomeScreen from './screen/Home';
import ProductScreen from './screen/Product';
import CartScreen from './screen/Cart';
import LoginScreen from './screen/Login';
import RegisterScreen from './screen/Register';
import ProfileScreen from './screen/Profile';
import ShippingScreen from './screen/Shipping';
import PaymentScreen from './screen/Payment';
import PlaceOrderScreen from './screen/PlaceOrder';
import OrderScreen from './screen/Order';
import UserListScreen from './screen/UserList';
import AdminEditScreen from './screen/AdminEdit';
import ProductList from './screen/ProductList';
import UpdateProduct from './screen/UpdateProduct';
import OrderList from './screen/OrderList'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <main className="py-3">
        <Container>
          <Route path='/search/:keyword' component={HomeScreen} exact/>
          <Route path='/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact/>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/productlist' component={ProductList} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductList} exact />
          <Route path='/admin/orderlist' component={OrderList} />
          <Route path='/admin/user/:id/edit' component={AdminEditScreen} />
          <Route path='/admin/product/:id/edit' component={UpdateProduct} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
