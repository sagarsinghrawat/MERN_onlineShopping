import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap';
import { listTopRatedProducts } from '../services/productService';
import Loader from './Loader';
import Message from './Message';

const TopRatedProduct = () => {

    const dispatch = useDispatch();

    const { loading, error, products } = useSelector( state => state.topRatedProduct)

    useEffect( () => {
        dispatch(listTopRatedProducts());
    }, [ dispatch ]) 

    return loading ? <Loader /> : error ? <Message varinat="danger">{error}</Message> : (
        <Carousel pause="hover" className="bg-dark">
            { products.map( product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name}&nbsp;(${product.price})</h2>
                        </Carousel.Caption>
                    </Link>

                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default TopRatedProduct
