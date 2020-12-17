import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { listUsers } from '../services/userService';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { userDeleteByAdmin } from '../services/adminService';

const UserListScreen = ({ history }) => {

    const usersList = useSelector( state => state.usersList );
    const { loading, error, users } = usersList;

    const { userInfo } = useSelector( state => state.userLogin );

    const { success } = useSelector( state => state.adminDelete );

    const dispatch = useDispatch();

    useEffect( () => {
        if( userInfo && userInfo.isAdmin ) {
            dispatch(listUsers())
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, success])

    const deleteHandler = id => {
        if( window.confirm("Are you sure ") ){
            dispatch(userDeleteByAdmin(id))
        }
    };

    return (
        <>
        <h1>USERS</h1>
        { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Table hover bordered striped responsive className="table-sm">
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { users.map( user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                            <td>{ user.isAdmin 
                                    ? <i className="fas fa-check" style={{color: "green"}}></i> 
                                    : <i className="fas fa-times" style={{color:"red"}}></i> 
                                }</td>
                            <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    &nbsp;&nbsp;
                                    <Button 
                                        variant="danger" 
                                        className="btn-sm"
                                        onClick={ () => deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}  
        </>
    )
}

export default UserListScreen
