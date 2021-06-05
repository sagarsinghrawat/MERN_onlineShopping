import http from './httpServices';
import { toast } from 'react-toastify'
import { 
    ADMIN_DELETE_FAIL, 
    ADMIN_DELETE_REQUEST, 
    ADMIN_DELETE_SUCCESS, 
    GET_ORDERS_BY_ADMIN_FAIL, 
    GET_ORDERS_BY_ADMIN_REQUEST, 
    GET_ORDERS_BY_ADMIN_SUCCESS, 
    PRODUCT_ADD_BY_ADMIN_FAIL, 
    PRODUCT_ADD_BY_ADMIN_REQUEST, 
    PRODUCT_ADD_BY_ADMIN_SUCCESS, 
    PRODUCT_DELETE_BY_ADMIN_FAIL, 
    PRODUCT_DELETE_BY_ADMIN_REQUEST, 
    PRODUCT_DELETE_BY_ADMIN_SUCCESS, 
    PRODUCT_UPDATE_BY_ADMIN_FAIL, 
    PRODUCT_UPDATE_BY_ADMIN_REQUEST, 
    PRODUCT_UPDATE_BY_ADMIN_SUCCESS, 
    USER_UPDATE_BY_ADMIN_FAIL, 
    USER_UPDATE_BY_ADMIN_REQUEST, 
    USER_UPDATE_BY_ADMIN_SUCCESS 
    } from "../utils/adminConstants";
import { USER_DETAILS_SUCCESS } from '../utils/userConstants';

export const userDeleteByAdmin = (id) => async( dispatch, getState ) => {

    try {

        dispatch({ type: ADMIN_DELETE_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await http.delete(`/api/users/${id}`, config )

        dispatch({ type: ADMIN_DELETE_SUCCESS })

    } catch (error) {

        dispatch({
            type: ADMIN_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userUpdateByAdmin = (user) => async( dispatch, getState ) => {

    try {

        dispatch({ type: USER_UPDATE_BY_ADMIN_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.put(`/api/users/${user._id}`, user, config )

        dispatch({ type: USER_UPDATE_BY_ADMIN_SUCCESS })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_BY_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const deleteProductByAdmin = (id) => async( dispatch, getState ) => {

    try {

        dispatch({ type: PRODUCT_DELETE_BY_ADMIN_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await http.delete(`/api/products/${id}`, config )

        dispatch({ type: PRODUCT_DELETE_BY_ADMIN_SUCCESS })

    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_BY_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const productAddByAdmin = () => async( dispatch, getState ) => {

    try {

        dispatch({ type: PRODUCT_ADD_BY_ADMIN_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.post(`/api/products`, {}, config )

        dispatch({ 
            type: PRODUCT_ADD_BY_ADMIN_SUCCESS,
            payload: data
         })

    } catch (error) {

        dispatch({
            type: PRODUCT_ADD_BY_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateProductByAdmin = (product) => async( dispatch, getState ) => {

    try {

        dispatch({ type: PRODUCT_UPDATE_BY_ADMIN_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.put(`/api/products/${product._id}`, product, config )

        dispatch({ 
            type: PRODUCT_UPDATE_BY_ADMIN_SUCCESS,
            payload: data
         })

    } catch (error) {

        if (error.response && error.response.status === 400) {
            toast.error(error.response.data);
          }
        
        dispatch({
            type: PRODUCT_UPDATE_BY_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const fetchOrdersByAdmin = () => async( dispatch, getState ) => {

    try {

        dispatch({ type: GET_ORDERS_BY_ADMIN_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.get(`/api/orders/`, config )

        dispatch({ 
            type: GET_ORDERS_BY_ADMIN_SUCCESS,
            payload: data
         })

    } catch (error) {

        dispatch({
            type: GET_ORDERS_BY_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
