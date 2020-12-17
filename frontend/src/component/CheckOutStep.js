import React from 'react';
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

const CheckOutStep = ({ step1, step2, step3, step4}) => {
    return (
        <Nav className="justify-content-center mb-2">
            <Nav.Item>
                {
                    step1 ? (<LinkContainer to='/login'>
                        <Nav.Link>SIGN IN&nbsp;<i className="fas fa-user-check"></i></Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>SIGN IN</Nav.Link> 
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step2 ? (<LinkContainer to='/shipping'>
                        <Nav.Link>SHIPPING&nbsp;<i class="fas fa-shipping-fast"></i></Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>SHIPPING</Nav.Link> 
                }
            </Nav.Item>

            <Nav.Item>
                {
                    step3 ? (<LinkContainer to='/payment'>
                        <Nav.Link>PAYMENT&nbsp;<i class="fas fa-credit-card"></i></Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>PAYMENT&nbsp;<i class="fas fa-credit-card"></i></Nav.Link> 
                }
                
            </Nav.Item>

            <Nav.Item>
                {
                    step4 ? (<LinkContainer to='/plcaeorder'>
                        <Nav.Link>PLACEORDER&nbsp;<i className="fa fa-shopping-cart"></i></Nav.Link>
                    </LinkContainer>)
                    : <Nav.Link disabled>PLACE ORDER&nbsp;<i className="fa fa-shopping-cart"></i></Nav.Link> 
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckOutStep
