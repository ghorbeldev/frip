import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import {
	clearErrors,
	createOrder,
} from '../../../redux/features/new-order/newOrderSlice';
import { useAlert } from 'react-alert';
import { resetCart } from '../../../redux/features/cart/cartSlice';

const ConfirmOrder = () => {
	const { cartItems, shippingInfo } = useSelector(state => state.cart);
	const { user } = useSelector(state => state.auth);
	const { error } = useSelector(state => state.order);
	const alert = useAlert();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	// Calculate Order Prices
	const avalaibleCartItems = cartItems.filter(item => item.stock > 0);
	const itemsPrice = avalaibleCartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);
	const shippingPrice = itemsPrice > 200 ? 0 : 7;
	const totalPrice = (itemsPrice + shippingPrice).toFixed(2);

	const confirmOrderHandler = () => {
		const data = {
			itemsPrice: Number(itemsPrice.toFixed(2)),
			shippingPrice,
			totalPrice: Number(totalPrice),
		};

		sessionStorage.setItem('orderInfo', JSON.stringify(data));

		const order = {
			orderItems: avalaibleCartItems,
			shippingInfo,
			...data,
		};

		dispatch(createOrder(order));
		if (!error) {
			dispatch(resetCart());
			navigate('/success');
		} else {
			alert.error('error');
			dispatch(clearErrors());
		}
	};
	useEffect(() => {
		if (error) {
			alert.error('error');
			dispatch(clearErrors());
		}
	}, [error, dispatch, alert]);
	return (
		<Fragment>
			<MetaData title={'Confirm Order'} />

			<div
				className='row d-flex justify-content-between wrapper px-5'
				id='confirm-order'
			>
				<div className='col-12 col-lg-8 mt-5 order-confirm'>
					<h4 className='mb-3'>Shipping Info</h4>
					<p>
						<b>Name:</b> {user && user.name}
					</p>
					<p>
						<b>Phone:</b> {shippingInfo.phoneNo}
					</p>
					<p className='mb-4'>
						<b>Address:</b>{' '}
						{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`}
					</p>

					<hr />
					<h4 className='mt-4'>Your Cart Items:</h4>

					{avalaibleCartItems.map(item => (
						<Fragment key={item.product}>
							<div className='cart-item my-1' key={item.product}>
								<div>
									<img src={item.image} alt='Laptop' height='45' width='65' />
								</div>

								<div>
									<Link to={`/product/${item.product}`}>{item.name}</Link>
								</div>

								<div>
									<p>
										{item.quantity} x {item.price}DT ={' '}
										<b>{(item.quantity * item.price).toFixed(2)}DT</b>
									</p>
								</div>
							</div>
						</Fragment>
					))}
				</div>

				<div className='col-12 col-lg-3 my-4'>
					<div id='order_summary'>
						<h4>Order Summary</h4>
						<hr />
						<p>
							Subtotal:{' '}
							<span className='order-summary-values'>{itemsPrice}DT</span>
						</p>
						<p>
							Shipping:{' '}
							<span className='order-summary-values'>{shippingPrice}DT</span>
						</p>

						<hr />

						<p>
							Total:{' '}
							<span className='order-summary-values'>{totalPrice}DT</span>
						</p>

						<hr />
						<button
							id='checkout_btn'
							className='btn btn-primary btn-block'
							onClick={confirmOrderHandler}
						>
							Confirm Your Order
						</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ConfirmOrder;
