import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { register } from '../services/userService';
import FormContainer from '../component/FormContainer';
import Message from '../component/Message';
import Loader from '../component/Loader';

const RegisterScreen = ({location, history }) => {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [ message, setMessage ] = useState(null);

    const dispatch = useDispatch();

    const { loading, userInfo, error } = useSelector( state => state.userRegister )

    const redirect = location.search ? location.search.split("=")[1] : '/';

    useEffect( () => {
        if( userInfo ){
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if( password !== confirmPassword ) setMessage('passwords does not match');
        else{
            dispatch(register(name, email, password))
        }
    }
    
    return (
        <FormContainer>
            <h1>SIGN UP</h1>
            { message && <Message variant="danger">{message}</Message>}
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
                    REGISTER
                </Button> 

                <Row className="py-3 px-3">
                        HAVE AN ACCOUNT ?&nbsp;&nbsp; <Link to={redirect ?  `/login?redirect=${redirect}` : '/login'}>LOGIN</Link>
                </Row> 
            </Form> 
        </FormContainer>
    )
}

export default RegisterScreen
