import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector }from 'react-redux'
import { listProductDetails } from '../services/productService';
import { updateProductByAdmin } from '../services/adminService';
import FormContainer from '../component/FormContainer';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { PRODUCT_UPDATE_BY_ADMIN_RESET } from '../utils/adminConstants';

const UpdateProduct = ({match, history}) => {

    const [ name, setName ] = useState('');
    const [ brand, setBrand ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ countInStock, setCountInStock ] = useState(0);
    const [ description, setDescription ] = useState('');
    const [ image, setImage ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ imageUpload, setImageUpload ] = useState(false);

    const dispatch = useDispatch();

    const { loading, product, error } = useSelector( state => state.productDetails )

    const { 
        loading: loadingUpdate, 
        success: successUpdate } = useSelector( state => state.adminUpdateProduct );

    useEffect( () => {
        if( successUpdate ){
            dispatch({ type: PRODUCT_UPDATE_BY_ADMIN_RESET });
            history.push(`/admin/productlist`);
        } else{
            
            if( !product.name || product._id !== match.params.id) {
                dispatch(listProductDetails(match.params.id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setDescription(product.description)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setImage(product.image)
                setCategory(product.category)
            }
        }
            

    },[ product, dispatch, match.params.id, successUpdate, history] )

    const imageUploadHandler = async (e) => {

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'shoppingCart')
        formData.append('cloud_name', "dvgdpbm11");

        setImageUpload(true);
        try {

            const imageURL = "https://api.cloudinary.com/v1_1/dvgdpbm11/image/upload"
            const { data } = await axios.post( imageURL, formData );

            setImage(data.url);
            setImageUpload(false);

        } catch {

            console.log(error);
            setImageUpload(false);
        }
        
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProductByAdmin({ 
            _id: match.params.id,
            name,
            price,
            description,
            image,
            countInStock,
            brand,
            category
        }));
    }


    return (
        <>
            <LinkContainer to="/admin/productlist">
                <Button variant="primary">
                    Go Back
                </Button>
            </LinkContainer>

            <FormContainer>
            <h1>UPDATE PRODUCT</h1>
            { loadingUpdate &&  <Loader/>}
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
    
                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter brand"
                        value={brand}
                        onChange={ e => setBrand(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter category"
                        value={category}
                        onChange={ e => setCategory(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter description"
                        value={description}
                        onChange={ e => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group> 
    
                <Form.Group controlId="price">    
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="price"
                        value={price}
                        onChange={ e => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="countInStock">    
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                        type="number" 
                        placeholder="count in stock"
                        value={countInStock}
                        onChange={ e => setCountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group> 

                <Form.Group controlId="image">    
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text" 
                        placeholder="Enter image url"
                        value={image}
                        onChange={ e => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                        id="image-file"
                        label="Choose file"
                        custom
                        onChange={imageUploadHandler}>
                    </Form.File>
                    { imageUpload && <Loader />}
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

export default UpdateProduct

