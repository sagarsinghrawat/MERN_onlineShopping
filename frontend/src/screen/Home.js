import React, {useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../services/productService';
import Product from '../component/Product';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Paginate from '../component/Paginate';
import TopRatedProduct from '../component/TopRatedProduct';
import Title from '../component/Title';

const HomeScreen = ({ match}) => {

    const pageNumber = match.params.pageNumber || 1

    const keyword = match.params.keyword
    const dispatch = useDispatch();

    const productList = useSelector( state => state.productList )
    const { loading, error, products, pages, page } = productList
    
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [ dispatch, keyword, pageNumber ] )

    return (
        <> 
            <Title />
            { !keyword ? <TopRatedProduct /> : <Link to="/" className="btn btn-dark">Go Back</Link>}
            <h1>LATEST PRODUCT</h1>
            { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
            <>
                <Row>
                    { products.map( product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}/>
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword: ''} />
            </>
            }
        </>
    )
}

export default HomeScreen
