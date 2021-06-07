import React, { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, ListGroup, Image, Form, Button } from 'react-bootstrap';
import Message from '../component/Message';
import { addToCart, removeFromCart } from '../services/cartService';
import { LinkContainer } from 'react-router-bootstrap';


const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id

    const qty = location.search ? location.search.split('=')[1] : 1 ;

    const dispatch = useDispatch();

    const { cartItems } = useSelector( state=> state.cart)

    useEffect( ()=> {
        if( productId ){
            dispatch( addToCart(productId, qty));
        }
    }, [dispatch, qty, productId]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () => {
        history.push("/login?redirect=shipping");
    }

    return (
        <Row>
            <Col md={8}>
                <h1>SHOPPING CART</h1>
                { cartItems.length === 0 ? (
                    <>
                    <Message>
                        Your Cart is empty
                    </Message>
                    <div class="d-flex justify-content-center" style={{fontSize: "24px"}}>
                        <i className="fas fa-shopping-cart fa-10x"></i>
                    </div>
                    <div class="d-flex justify-content-center">
                        &nbsp;&nbsp;&nbsp;&nbsp;<h1>No items in the cart</h1>
                    </div>
                    <div class="d-flex justify-content-center">
                        <Link to='/'>
                            <Button>Go Back</Button>
                        </Link>
                    </div>
                    </>
                ):(
                    <ListGroup variant="flush">
                        {
                            cartItems.map( item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>{item.price}</Col>
                                        <Col md={2}>
                                            <Form.Control 
                                                as="select" 
                                                value={item.qty} 
                                                onChange={ e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map( (x) => (
                                                        <option key={x+1} value={x+1}> 
                                                            { x+1 }
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button 
                                                type="button" 
                                                variant="light"
                                                onClick={ () => removeFromCartHandler(item.product)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )) }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SUBTOTAL ({cartItems.reduce((acc, item) => acc + (item.qty)*1 , 0)}) ITEMS</h2>
                            ${ cartItems.reduce((acc,item) => acc + (item.qty)*item.price , 0 ).toFixed(2)};
                        </ListGroup.Item>
                        {
                            cartItems.length !== 0 &&
                        <ListGroup.Item>
                            <Button
                                onClick={checkOutHandler} 
                                type="button" 
                                className="btn-block" >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
