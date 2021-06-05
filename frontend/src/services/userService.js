import http from './httpServices';
import { toast } from 'react-toastify'
import { ORDER_LIST_MY_RESET } from '../utils/orderConstants';
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET
} from '../utils/userConstants';

export const login = ( email, password ) => async( dispatch ) => {

    try {
        dispatch({  type: USER_LOGIN_REQUEST})

        const { data } = await http.post("/api/users/login", {email, password} )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));

        toast.success('Successfully Sign In')

    } catch (error) {

        toast.error('Invalid Email id or Password')

        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}

export const register = ( name, email, password ) => async( dispatch ) => {

    try {

        dispatch({ type: USER_REGISTER_REQUEST })

        const { data } = await http.post('/api/users', { name, email, password } )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('Successfully Register')

    } catch (error) {

        if (error.response && error.response.status === 400) {
            toast.error(error.response.data);
          }

        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT })
    dispatch({type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
    // window.location = '/login'
}

export const getUserDetails = ( id ) => async( dispatch, getState ) => {

    try {

        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.get(`/api/users/${id}`, config )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = ( user ) => async( dispatch, getState ) => {

    try {

        dispatch({ type: USER_UPDATE_PROFILE_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.put(`/api/users/profile`, user  , config )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const listUsers = () => async( dispatch, getState ) => {

    try {

        dispatch({ type: USER_LIST_REQUEST })

        const { userLogin : { userInfo } } = getState();

        const config = {
            headers : { 
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await http.get(`/api/users`, config )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}