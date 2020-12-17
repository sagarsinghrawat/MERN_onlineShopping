import React from 'react'
import { Link }  from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Card.Header variant="dark" style={{color: "black"}}>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link> 
            </Card.Header>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top"/>
            </Link>
            <Card.Footer>
                 <Card.Text as="div">
                     <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                 </Card.Text>

                <Card.Text as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default Product