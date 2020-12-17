import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import FormContainer from '../component/FormContainer';
import CheckOutStep from '../component/CheckOutStep';
import { savePaymentMethod } from '../services/cartService'


const PaymentScreen = ({history}) => {

    const cart = useSelector( state => state.cart)
    const { shippingAddress } = cart;

    if( !shippingAddress ) {
        history.push('/shipping');

    }
    const [ paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');

    }

    return (
        <FormContainer>
            <CheckOutStep step1 step2 step3/>
            <h1>PAYMENT METHOD</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label="PayPal"
                            value="PayPal"
                            id="PayPal"
                            name="paymentMethod"
                            onChange={ e => setPaymentMethod(e.target.value)}/>
                            
                        <Form.Check
                            type='radio'
                            label='Credit Card'
                            value='Credit Card'
                            name="paymentMethod"
                            id='CreditCard'
                            onChange={ e => setPaymentMethod(e.target.value)} />

                        <Form.Check
                            type='radio'
                            label='Debit Card'
                            value='Debit Card'
                            name='paymentMethod'
                            id='DebitCard'
                            onChange={ e => setPaymentMethod(e.target.value)} />

                        <Form.Check
                            type='radio'
                            label='Net Banking'
                            value='Net Banking'
                            name='paymentMethod'
                            id='NetBanking'
                            onChange={ e => setPaymentMethod(e.target.value)} />
                    </Col>
                </Form.Group>
            
                <Button type='submit' variant='primary'>
                    CONTINUE
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

