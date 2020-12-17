import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_REVIEWS_REQUEST,
    PRODUCT_REVIEWS_SUCCESS,
    PRODUCT_REVIEWS_FAIL,
    PRODUCT_REVIEWS_RESET,
    TOP_RATED_PRODUCT_REQUEST,
    TOP_RATED_PRODUCT_SUCCESS,
    TOP_RATED_PRODUCT_FAIL
 } from '../utils/productConstants'

export const productListReducer = ( state = { products: [] }, action) => {

    switch( action.type ) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            };
        
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        
        default: return state;
    }
}

export const productDetailsReducer = ( state = { product: { reviews: [] } }, action) => {

    switch( action.type ) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        
        default: return state;
    }
}

export const productReviewReducer = ( state = { }, action) => {

    switch( action.type ) {
        case PRODUCT_REVIEWS_REQUEST:
            return { loading: true };

        case PRODUCT_REVIEWS_SUCCESS:
            return { loading: false, success: true };
        
        case PRODUCT_REVIEWS_FAIL:
            return { loading: false, error: action.payload };
        
        case PRODUCT_REVIEWS_RESET:
                return {};
        
        default: return state;
    }
}

export const topRatedProductReducer = ( state = { products: [] }, action) => {

    switch( action.type ) {
        case TOP_RATED_PRODUCT_REQUEST:
            return { loading: true, products: []};

        case TOP_RATED_PRODUCT_SUCCESS:
            return { loading: false, products: action.payload };
        
        case TOP_RATED_PRODUCT_FAIL:
            return { loading: false, error: action.payload };
        
        default: return state;
    }
}