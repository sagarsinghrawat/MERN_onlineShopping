import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom';
import { Card, Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { useSelector, useDispatch }from 'react-redux';
import { deliveredOrder, getOrderDetails, payOrder } from '../services/orderService';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../utils/orderConstants'
import Loader from '../component/Loader'
import Message from '../component/Message';

const OrderScreen = ({ match }) => {

    const [ sdkReady, setSdkReady] = useState(false);

    const{ order, loading, error } = useSelector( state => state.orderDetails)
    
    const { userInfo  } = useSelector( state => state.userLogin);

    const{ loading: loadingPay, success: successPay } = useSelector( state => state.orderPay)

    const{ loading: loadingDeliver, success: successDeliver } = useSelector( state => state.orderDeliver)
    
    const dispatch = useDispatch();

    const orderId = match.params.id

    useEffect( () => {
        
        const addPayPalScript = async () => {
            
            const { data : clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script)
        }

        if( !order || (order._id !== orderId) || successPay || successDeliver ) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId));
            
        } else if(!order.isPaid){
            if( !window.paypal){
                addPayPalScript();
            }
            else{
                setSdkReady(true)
            }    
        }

    }, [dispatch, orderId , order, successPay, successDeliver, loadingDeliver]);

    const successPaymentHandler = (paymentResult)=> {
        dispatch(payOrder( orderId, paymentResult))
    }

    const orderDeliverHandler = () => {
        dispatch(deliveredOrder(order))
    };


    return (
        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <h2>ORDER ID:&nbsp; {order._id}</h2>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <p>
                                <strong>Name:&nbsp;</strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email:&nbsp;</strong>
                                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>&nbsp;&nbsp;
                                {order.shippingAddress.address}, {order.shippingAddress.city}, 
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? <Message variant="success">Delivered on {order.DeliveredAt}</Message> 
                                : <Message variant="danger">Not Delivered</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>PAYMENT METHOD</h2>
                            <p>
                                <strong>Method:</strong>&nbsp;&nbsp;
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid? <Message variant="success">Paid on {order.paidAt}</Message> 
                                : <Message variant="danger">Not Paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>ORDER ITEMS</h2>
                            {
                                order.orderItems.length === 0 
                                ? <Message>Your Order is Empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                    
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
                                    <Col>${order.orderItems.reduce((acc,item) => acc+ item.qty*item.price, 0).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>           
                            { !userInfo.isAdmin && !order.isPaid && (
                               <ListGroup.Item>
                                   { loadingPay && <Loader />}
                                   { !sdkReady ? <Loader /> : (
                                       <PayPalButton 
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}/>
                                   )}
                               </ListGroup.Item>
                            )}
                            { loadingDeliver && <Loader />}
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type="button" className="btn btn-block" onClick={orderDeliverHandler}>
                                            MARK AS DELIVERED
                                        </Button>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </> 
        )
    )
}

export default OrderScreen