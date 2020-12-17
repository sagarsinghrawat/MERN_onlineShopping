import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { fetchOrdersByAdmin } from '../services/adminService';
import Message from '../component/Message';
import Loader from '../component/Loader';

const OrderList = ({ history }) => {

    const { userInfo } = useSelector( state => state.userLogin );

    const { loading, error, orders } = useSelector( state => state.adminGetOrders );

    const dispatch = useDispatch();

    useEffect( () => {

        if( userInfo && userInfo.isAdmin ){
            dispatch(fetchOrdersByAdmin());
        } else{
            history.push('/login')
        }
    }, [ dispatch, history, userInfo ])

    return (
        <>
        <h1>ORDERLIST</h1>
        { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table hover bordered striped responsive className="table-sm">
                <thead>
                    <tr>
                        <th>ORDER ID</th>
                        <th>USER ID</th>
                        <th>USER NAME</th>
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
                            <td>{order._id}</td>
                            <td>{order.user && order.user._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{ order.isPaid 
                                    ? (order.paidAt).substring(0, 10) 
                                    : <i className="fas fa-times" style={{color:"red"}}></i> 
                                }</td>

                            <td>{ order.isDelivered
                                    ? (order.deliveredAt).substring(0, 10) 
                                    : <i className="fas fa-times" style={{color:"red"}}></i> 
                                }</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant="dark" className="btn-sm">
                                        DETAILS
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}  
        </>
    )
}

export default OrderList
