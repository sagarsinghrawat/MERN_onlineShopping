import { 
    ADMIN_DELETE_FAIL, 
    ADMIN_DELETE_REQUEST, 
    ADMIN_DELETE_SUCCESS, 
    USER_UPDATE_BY_ADMIN_FAIL, 
    USER_UPDATE_BY_ADMIN_REQUEST, 
    USER_UPDATE_BY_ADMIN_SUCCESS,
    USER_UPDATE_BY_ADMIN_RESET, 
    PRODUCT_DELETE_BY_ADMIN_REQUEST,
    PRODUCT_DELETE_BY_ADMIN_SUCCESS,
    PRODUCT_DELETE_BY_ADMIN_FAIL,
    PRODUCT_ADD_BY_ADMIN_REQUEST,
    PRODUCT_ADD_BY_ADMIN_SUCCESS,
    PRODUCT_ADD_BY_ADMIN_FAIL,
    PRODUCT_ADD_BY_ADMIN_RESET,
    PRODUCT_UPDATE_BY_ADMIN_REQUEST,
    PRODUCT_UPDATE_BY_ADMIN_SUCCESS,
    PRODUCT_UPDATE_BY_ADMIN_FAIL,
    PRODUCT_UPDATE_BY_ADMIN_RESET,
    GET_ORDERS_BY_ADMIN_REQUEST,
    GET_ORDERS_BY_ADMIN_SUCCESS,
    GET_ORDERS_BY_ADMIN_FAIL} from "../utils/adminConstants";

export const adminDeleteReducer = ( state = { }, action ) => {

    switch(action.type) {
        case ADMIN_DELETE_REQUEST:
            return { loading: true }
        case ADMIN_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ADMIN_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;   
    }
}

export const userUpdateByAdminReducer = ( state = { user: {}}, action ) => {

    switch(action.type) {
        case USER_UPDATE_BY_ADMIN_REQUEST:
            return { loading: true }
        case USER_UPDATE_BY_ADMIN_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_UPDATE_BY_ADMIN_RESET:
            return { user: {} }
        default:
            return state;   
    }
}

export const deleteProductByAdminReducer = ( state = {}, action ) => {

    switch(action.type) {
        case PRODUCT_DELETE_BY_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_DELETE_BY_ADMIN_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_DELETE_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;   
    }
}

export const productAddByAdminReducer = ( state = {}, action ) => {

    switch(action.type) {
        case PRODUCT_ADD_BY_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_ADD_BY_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_ADD_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_ADD_BY_ADMIN_RESET:
            return {};
        default:
            return state;   
    }
}

export const productUpdateByAdminReducer = ( state = { product: {} }, action ) => {

    switch(action.type) {
        case PRODUCT_UPDATE_BY_ADMIN_REQUEST:
            return { loading: true }
        case PRODUCT_UPDATE_BY_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_BY_ADMIN_RESET:
            return { product: {} };
        default:
            return state;   
    }
}

export const getOrdersByAdminReducer = ( state = { orders: [] }, action ) => {

    switch(action.type) {
        case GET_ORDERS_BY_ADMIN_REQUEST:
            return { loading: true }
        case GET_ORDERS_BY_ADMIN_SUCCESS:
            return { loading: false, orders: action.payload }
        case GET_ORDERS_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;   
    }
}