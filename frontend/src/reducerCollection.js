import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailsReducer, productListReducer, productReviewReducer, topRatedProductReducer } from './reducer/productReducers';
import { cartReducer } from './reducer/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, usersListReducer } from './reducer/userReducers';
import { orderCreateReducer, orderDeliveredReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducer/orderReducers';
import { adminDeleteReducer, deleteProductByAdminReducer, userUpdateByAdminReducer, 
        productAddByAdminReducer, productUpdateByAdminReducer, getOrdersByAdminReducer } from './reducer/adminReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    usersList: usersListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver : orderDeliveredReducer,
    orderListMy : orderListMyReducer,
    adminDelete: adminDeleteReducer,
    adminUserUpdate: userUpdateByAdminReducer,
    adminDeleteProduct: deleteProductByAdminReducer,
    adminAddProduct: productAddByAdminReducer,
    adminUpdateProduct: productUpdateByAdminReducer,
    adminGetOrders: getOrdersByAdminReducer,
    topRatedProduct: topRatedProductReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}

const initialState = {
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage 
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools( applyMiddleware(...middleware)))

export default store;