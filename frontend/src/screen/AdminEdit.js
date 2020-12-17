import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { getUserDetails } from '../services/userService';
import { userUpdateByAdmin } from '../services/adminService';
import { USER_UPDATE_BY_ADMIN_RESET } from '../utils/adminConstants'
import FormContainer from '../component/FormContainer';
import Message from '../component/Message';
import Loader from '../component/Loader';

const AdminEditScreen = ({match, history}) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ isAdmin, setIsAdmin ] = useState(false);

    const dispatch = useDispatch();

    const { loading, user, error } = useSelector( state => state.userDetails )

    const { loading: loadingUpdate, 
            success: successUpdate,
            error: errorUpdate 
        } = useSelector( state => state.adminUserUpdate )

    useEffect( () => {
        if( successUpdate ){
            dispatch({ type: USER_UPDATE_BY_ADMIN_RESET })
            history.push("/admin/userlist");
        }
        else{
            if( !user.name || user._id !== match.params.id) {
                dispatch(getUserDetails(match.params.id))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    },[ history, successUpdate, user, dispatch, match.params.id] )

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(userUpdateByAdmin({ _id: match.params.id, name, email, isAdmin }))
    }
    
    return (
        <>
            <LinkContainer to="/admin/userlist">
                <Button variant="primary">
                    Go Back
                </Button>
            </LinkContainer>

            <FormContainer>
            <h1>EDIT USER</h1>
            { loadingUpdate && <Loader />}
            { errorUpdate && <Message variant="danger">{error}</Message>}
            { loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> : (
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
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={ e => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
    
                <Form.Group controlId="isAdmin">    
                    <Form.Check
                        type="checkbox" 
                        label="Is Admin"
                        checked={isAdmin}
                        onChange={ e => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                </Form.Group> 
    
                <Button type="submit" variant="primary">
                    UPDATE
                </Button> 
                </Form> 
            )}
            </FormContainer>
        </>   
    )
}

export default AdminEditScreen

