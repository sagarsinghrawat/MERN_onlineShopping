import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useSelector, useDispatch }from 'react-redux';
import { createOrder } from '../services/orderService';
import Message from '../component/Message';

const PlaceOrderScreen = ({ history }) => {

    const cart = useSelector( state => state.cart)
    const { cartItems, shippingAddress } = cart;

    const addDecimal = (num) => {
        return (Math.round(num*100)/100).toFixed(2);
    }
    cart.itemsPrice = addDecimal(Number(cartItems.reduce((acc, item) => acc + item.price*item.qty, 0)).toFixed(2));
    console.log(cart.itemsPrice)
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
    cart.taxPrice = addDecimal((0.09*cart.itemsPrice));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

    const orderCreate = useSelector( state => state.orderCreate)

    const{ order, success, error } = orderCreate;

    useEffect( () => {
        if( success ) {
            history.push(`/order/${order._id}`);
        }
    }, [ success, history, order])

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            taxPrice: cart.taxPrice,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>SHIPPING</h2>
                            <p>
                                <strong>Address:</strong>&nbsp;&nbsp;
                                {shippingAddress.address}, {shippingAddress.city}, 
                                {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method:</strong>&nbsp;&nbsp;
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                            {
                                cartItems.length === 0 
                                ? <Message>Your Cart is Empty</Message> : (
                                <ListGroup variant="flush">
                                    {cartItems.map((item, index) => (
                                    
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = {(item.qty*item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    
                                        ))
                                    }
                                </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>              
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item className="justify-center"><h2>ORDER SUMMARY</h2></ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items Price</Col>
                                    <Col>${addDecimal(cartItems.reduce((acc,item) => acc+ item.qty*item.price, 0))}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            { error &&
                            <ListGroup.Item>
                                <Message variant="danger">{error}</Message>
                            </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button 
                                    type="button" 
                                    className="btn-block"
                                    disable={ cartItems.length ? "false" : "true" }
                                    onClick={placeOrderHandler}
                                    >
                                        PLACE ORDER
                                </Button>
                                    
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row> 
        </>
    )
}

export default PlaceOrderScreen
