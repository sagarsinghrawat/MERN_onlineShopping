import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../services/userService'
import SearchBox from './SearchBox';

const Header = () => {

  const dispatch = useDispatch();

  const { userInfo } = useSelector( state => state.userLogin )

  const logOutHandler = () => {
    dispatch(logout());
  }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
              <Container>
                <LinkContainer to="/">
                  <Navbar.Brand><i class="fa fa-shopping-basket" aria-hidden="true"></i>&nbsp;SHOPPING</Navbar.Brand>
                </LinkContainer>
              
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Route render={ ({ history }) => <SearchBox history={history} />} />
                <Nav className="ml-auto">
                  <LinkContainer to="/cart">
                    <Nav.Link><i className="fas fa-shopping-cart"></i> CART</Nav.Link>
                  </LinkContainer>
                  { userInfo ? (
                    <NavDropdown title={userInfo.name.toUpperCase()} id="username">
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item><i class="fas fa-user"></i>&nbsp;&nbsp;PROFILE</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/login">
                        <NavDropdown.Item onClick={logOutHandler}><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;LOGOUT</NavDropdown.Item>
                      </LinkContainer>  
                    </NavDropdown>
                  ):(
                    <LinkContainer to="/login">
                    <Nav.Link><i className="fas fa-user"></i>  SIGN IN</Nav.Link>
                  </LinkContainer>
                  )}
                  { userInfo && userInfo.isAdmin && (
                    <NavDropdown title="ADMIN" id="adminmenu">
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item><i class="fas fa-users"></i>&nbsp;&nbsp;USERS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item><i class="fab fa-product-hunt"></i>&nbsp;&nbsp;PRODUCTS</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item><i class="fas fa-list"></i>&nbsp;&nbsp;ORDERS</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
    )
}
export default Header
