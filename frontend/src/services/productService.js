import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_REVIEWS_REQUEST,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_FAIL,
    TOP_RATED_PRODUCT_REQUEST,
    TOP_RATED_PRODUCT_SUCCESS,
    TOP_RATED_PRODUCT_FAIL} from '../utils/productConstants';
    
import axios from 'axios';

export const listProducts = ( keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const reviewProduct = ( productId, review ) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_REVIEWS_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.post(`/api/products/${productId}/reviews`, review, config );

        dispatch({ type: PRODUCT_REVIEWS_SUCCESS })
        
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEWS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listTopRatedProducts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TOP_RATED_PRODUCT_REQUEST })

        const { data } = await axios.get(`/api/products/top`);

        dispatch({ 
            type: TOP_RATED_PRODUCT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: TOP_RATED_PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}