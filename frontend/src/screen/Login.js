import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { login } from '../services/userService';
import FormContainer from '../component/FormContainer';
import Message from '../component/Message';
import Loader from '../component/Loader';

const LoginScreen = ({location, history }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();

    const { loading, userInfo, error } = useSelector( state => state.userLogin )

    const redirect = location.search ? location.search.split("=")[1] : '/';
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }
    
    useEffect( () => {
        if( userInfo ){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    return (
        <FormContainer>
            <h1>SIGN IN</h1>
            {/* { error && <Message variant="danger">{error}</Message> } */}
            { loading && <Loader/> }
            <Form onSubmit={submitHandler} >
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
                <Button type="submit" variant="primary">
                    SIGN IN
                </Button> 

                <Row className="py-3 px-3">
                        NEW CUSTOMER ? &nbsp;&nbsp; <Link to={ redirect ?  `/register?redirect=${redirect}` : '/register' }>REGISTER</Link>
                        
                </Row> 
            </Form> 
        </FormContainer>
    )
}

export default LoginScreen
