import React, { useState, useEffect}  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Image, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../component/Rating';
import { listProductDetails, reviewProduct } from '../services/productService';
import { PRODUCT_REVIEWS_RESET } from '../utils/productConstants'
import Loader from '../component/Loader';
import Message from '../component/Message';
import Title from '../component/Title';


const ProductScreen = ({match, history }) => {

    const [ qty, setQty ] = useState(1);
    const [ rating, setRating ] = useState(0);
    const [ comment, setComment ] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector( (state) => state.productDetails )
    const { loading, error, product } = productDetails;

    const {userInfo} = useSelector( (state) => state.userLogin )

    const {  
        error: errorReview, 
        success: successReview } = useSelector( state => state.productReview)

    useEffect(()=> {
        if( successReview ){
            alert("Product Review");
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEWS_RESET })
        }
        dispatch(listProductDetails(match.params.id));

    },[ dispatch,match.params.id, successReview]);
    
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
    
    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(reviewProduct( match.params.id, { rating, comment }))
    }

    return (
        <>
            <Link to="/">
                <Button className='btn btn-dark my-3'>Go Back</Button>
            </Link>
            { loading ? <Loader /> : error ? <Message variant="danger" /> : (
                <>
                <Title title={product.name}/>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price:</strong> ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                product.countInStock > 0 && 
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={ e => setQty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map( x=>(
                                                        <option key={x+1} value={x+1}> 
                                                            { x+1 }
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Button 
                                    onClick={addToCartHandler}
                                    className="btn-block" 
                                    type="button"
                                    disabled={ product.countInStock ? false : true }>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>REVIEWS</h2>
                    { product.reviews.length === 0 && <Message>No Reviews</Message> }
                    <ListGroup variant="flush">
                        { product.reviews.map( review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Customer review</h2>
                            { errorReview && <Message variant="danger">{errorReview}</Message>}
                            { userInfo ? (
                                <Form onSubmit={reviewSubmitHandler}>
                                    <Form.Group  controlId="rating">
                                        <Form.Label><strong>Rating</strong></Form.Label>
                                        <Form.Control 
                                            as="select" 
                                            value={rating} 
                                            onChange={ e => setRating(e.target.value) }>
                                            <option value=''>Select....</option>
                                            <option value='1'>1-Poor</option>
                                            <option value='2'>2-Fair</option>
                                            <option value='3'>3-Good</option>
                                            <option value='4'>4-Very Good</option>
                                            <option value='5'>5-Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label><strong>Comment</strong>&nbsp;&nbsp;<i className="fas fa-comment"></i></Form.Label>
                                        <Form.Control
                                            as="textarea" 
                                            row="4"
                                            value={comment}
                                            onChange={ e=> setComment(e.target.value)}></Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">Submit</Button>
                                </Form>
                            ): <Message> Please&nbsp; <Link to="/login"> SIGN IN </Link>&nbsp;to write a review</Message>}
                        </ListGroup.Item>
                    </ListGroup>  
                </Col>
            </Row>
            </>
            )}         
        </>
    )
}

export default ProductScreen