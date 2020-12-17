import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { listProducts } from '../services/productService';
import { deleteProductByAdmin, productAddByAdmin } from '../services/adminService'
import Message from '../component/Message';
import Loader from '../component/Loader';
import { PRODUCT_ADD_BY_ADMIN_RESET } from '../utils/adminConstants';
import Paginate from '../component/Paginate';

const ProductList = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1
    const { loading, error, products, pages, page } = useSelector( state => state.productList );

    const { 
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = useSelector( state => state.adminDeleteProduct );

    const { 
        loading: loadingAdd,
        error: errorAdd,
        success: successAdd,
        product: addProduct
    } = useSelector( state => state.adminAddProduct );

    const { userInfo } = useSelector( state => state.userLogin );

    const dispatch = useDispatch();

    useEffect( () => {

        dispatch({ type: PRODUCT_ADD_BY_ADMIN_RESET })
        if( !userInfo.isAdmin ) {
            history.push('/login');
        }
    
        if( successAdd ){
            history.push(`/admin/product/${addProduct._id}/edit`)
        } else{
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, successDelete, addProduct, successAdd, pageNumber ])

    const deleteHandler = id => {
        if( window.confirm("Are you sure ") ){
            dispatch(deleteProductByAdmin(id));
        }
    };

    const createProductHandler = () => {
        dispatch( productAddByAdmin() )
    };

    return (
        <>
        <Row className="align-items-center">
            <Col>
                <h1>PRODUCTS</h1>
            </Col>
            <Col className="text-right">
                <Button className="my-3" onClick={createProductHandler}>
                    <i className="fas fa-plus"></i>&nbsp;&nbsp;CREATE PRODUCT

                </Button>
            </Col>
        </Row>
        { loadingDelete && <Loader />}
        { errorDelete && <Message variant="danger">{errorDelete}</Message>}
        { loadingAdd && <Loader />}
        { errorAdd && <Message variant="danger">{errorAdd}</Message>}
        { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <>
            <Table hover bordered striped responsive className="table-sm">
                <thead>
                    <tr>
                        <th>PRODUCT ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { products.map( product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    &nbsp;&nbsp;
                                    <Button 
                                        variant="danger" 
                                        className="btn-sm"
                                        onClick={ () => deleteHandler(product._id)}><i className="fas fa-trash"></i></Button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
            </>
        )}  
        </>
    )
}

export default ProductList
