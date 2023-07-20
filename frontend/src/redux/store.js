import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import productsReducer from './features/products/productsSlice';
import productDetailsReducer from './features/product-details/productDetailsSlice';
import authReducer from './features/user/authSlice';
import userReducer from './features/user/userSlice';
import forgotPasswordReducer from './features/user/forgotPasswordSlice';
import cartReducer from './features/cart/cartSlice';
import newOrderReducer from './features/new-order/newOrderSlice';
import userOrdersReducer from './features/user-orders/userOrdersSlice';
import orderDetailsReducer from './features/order-details/orderDetailsSlice';
import newProductReducer from './features/new-product/newProductSlice';
import productReducer from './features/product/productSlice';
import allOrdersReducer from './features/allOrders/allOrdersSlice';
import orderReducer from './features/order/orderSlice';
import allUsersReducer from './features/allUsers/allUsersSlice';
import userDetailsReducer from './features/userDetails/userDetailsSlice';

const middlewares = [thunk];
const store = configureStore({
	reducer: {
		products: productsReducer,
		productDetails: productDetailsReducer,
		auth: authReducer,
		user: userReducer,
		forgotPassword: forgotPasswordReducer,
		cart: cartReducer,
		newOrder: newOrderReducer,
		userOrders: userOrdersReducer,
		orderDetails: orderDetailsReducer,
		newProduct: newProductReducer,
		product: productReducer,
		allOrders: allOrdersReducer,
		order: orderReducer,
		allUsers: allUsersReducer,
		userDetails: userDetailsReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }).concat(middlewares),
	devTools: true,
});

export default store;
