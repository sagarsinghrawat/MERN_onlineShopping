import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { getUserDetails, updateUserProfile } from '../services/userService';
import { listMyOrders } from '../services/orderService'
import Message from '../component/Message';
import Loader from '../component/Loader';

const ProfileScreen = ({location, history }) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ message, setMessage ] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector( state => state.userDetails );
    const { loading, error, user } = userDetails

    const userLogin = useSelector( state => state.userLogin );
    const { userInfo } = userLogin

    const { success } = useSelector( state => state.userUpdateProfile );

    const orderListMy = useSelector( state => state.orderListMy );
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    
    useEffect( () => {
        if( !userInfo ){
            history.push('/login')
        }
        else {
            if( !user.name ){
                dispatch(getUserDetails("profile"));
                dispatch(listMyOrders())
            } else{
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if( password !== confirmPassword ) setMessage('passwords does not match');
        else{
            dispatch( updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={3}>
            <h2>USER PROFILE</h2>
            { message && <Message variant="danger">{message}</Message>}
            { error && <Message variant="danger">{error}</Message> }
            { success && <Message variant="success">PROFILE UPDATE</Message> }
            { loading && <Loader/> }
            <Form onSubmit={submitHandler} >
                <Form.Group controlId="name">
                    <Form.Label>NAME</Form.Label>
                    <Form.Control 
                        type="name" 
                        placeholder="Enter name"
                        value={name}
                        onChange={ e => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="email">
                    <Form.Label>EMAIL ADDRESS</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="password">
                    <Form.Label>PASSWORD</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password"
                        value={password}
                        onChange={ e => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="confirmPassword">
                    <Form.Label>CONFIRM PASSWORD</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={ e => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
                
                <Button type="submit" variant="primary">
                    UPDATE
                </Button> 
                </Form>
            </Col>
            <Col md={9}>
                <h2>MY ORDERS</h2>
                { loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                    <Table striped responsive bordered hover className="table-sm">
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            { orders.map( order => (
                                <tr key={order._id}>
                                    <th>{order._id}</th>
                                    <th>{order.createdAt.substring(0,10)}</th>
                                    <th>{order.totalPrice}</th>
                                    <th>{order.isPaid ? order.paidAt.substring(0,10) : 
                                        <i className="fas fa-times" style={{color: "red"}}></i>
                                    }</th>
                                    <th>{order.isDelivered ? order.deliveredAt.substring(0,10) : 
                                        <i className="fas fa-times" style={{color: "red"}}></i>
                                    }</th>
                                    <th>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button 
                                                variant="primary" 
                                                className="btn-sm" 
                                                > Details </Button>
                                        </LinkContainer>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
        

                
    )
}

export default ProfileScreen
