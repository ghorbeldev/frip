import './scss/App.scss';
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';
import Home from './components/layout/home/Home';
import { Route, Routes } from 'react-router-dom';
import Product from './components/product/Product';
import Shop from './components/layout/shop/Shop';
import Contact from './components/layout/contact/Contact';
import Login from './components/layout/login/Login';
import Register from './components/layout/register/Register';
import { loadUser } from './redux/features/user/authSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Profile from './components/layout/profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './components/layout/update-profile/UpdateProfile';
import UpdatePassword from './components/layout/update-password/UpdatePassword';
import ForgotPassword from './components/layout/forgot-password/ForgotPassword';
import NewPassword from './components/layout/new-password/NewPassword';
import Cart from './components/layout/cart/Cart';
import Shipping from './components/layout/shipping/Shipping';
import ConfirmOrder from './components/layout/confirm-order/ConfirmOrder';
import OrderSuccess from './components/layout/order-success/OrderSuccess';
import Orders from './components/layout/orders/Orders';
import OrderDetails from './components/layout/order-details/OrderDetails';
import Dashboard from './components/admin-layout/dashboard/Dashboars';
import ProductsList from './components/admin-layout/products-list/ProductsList';
import NewProduct from './components/admin-layout/new-product/NewProduct';
import { CloudinaryContext } from 'cloudinary-react';
import UpdateProduct from './components/admin-layout/update-product/UpdateProduct';
import OrdersList from './components/admin-layout/orders-list/OrdersList';
import ProcessOrder from './components/admin-layout/process-order/ProcessOrder';
import UsersList from './components/admin-layout/users-list/UsersList';
import UpdateUser from './components/admin-layout/update-user/UpdateUser';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	});
	return (
		<div className='App'>
			<CloudinaryContext cloudName={'dqs53yu4o'}>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/shop' element={<Shop />} />
					<Route path='/login' element={<Login />} />
					<Route path='/login/shipping' element={<Shipping />} />
					<Route path='/confirm' element={<ConfirmOrder />} />
					<Route path='/success' element={<OrderSuccess />} />
					<Route path='/me' element={<ProtectedRoute component={Profile} />} />
					<Route path='/me/update' element={<UpdateProfile />} />
					<Route path='/password/update' element={<UpdatePassword />} />
					<Route path='/password/forgot' element={<ForgotPassword />} />
					<Route path='/password/reset/:token' element={<NewPassword />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='/orders/me' element={<Orders />} />
					<Route path='/order/:id' element={<OrderDetails />} />
					<Route path='/register' element={<Register />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/product/:id' element={<Product />} />
					{/* Admin Routes */}
					<Route
						path='/dashboard'
						element={<ProtectedRoute isAdmin={true} component={Dashboard} />}
					/>
					<Route
						path='/admin/products'
						element={<ProtectedRoute isAdmin={true} component={ProductsList} />}
					/>
					<Route
						path='/admin/product'
						element={<ProtectedRoute isAdmin={true} component={NewProduct} />}
					/>
					<Route
						path='/admin/product/:id'
						element={
							<ProtectedRoute isAdmin={true} component={UpdateProduct} />
						}
					/>
					<Route
						path='/admin/orders'
						element={<ProtectedRoute isAdmin={true} component={OrdersList} />}
					/>
					<Route
						path='/admin/order/:id'
						element={<ProtectedRoute isAdmin={true} component={ProcessOrder} />}
					/>
					<Route
						path='/admin/users'
						element={<ProtectedRoute isAdmin={true} component={UsersList} />}
					/>
					<Route
						path='/admin/user/:id'
						element={<ProtectedRoute isAdmin={true} component={UpdateUser} />}
					/>
				</Routes>
				<Footer />
			</CloudinaryContext>
		</div>
	);
}

export default App;
