import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import Loader from '../../loader/Loader';
import {
	clearErrors,
	getOrderDetails,
} from '../../../redux/features/order-details/orderDetailsSlice';
import './order-details.scss';

const OrderDetails = () => {
	const params = useParams();
	const alert = useAlert();
	const dispatch = useDispatch();

	const {
		loading,
		error,
		order = {},
	} = useSelector(state => state.orderDetails);
	const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;

	useEffect(() => {
		dispatch(getOrderDetails(params.id));

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error]);

	const shippingDetails =
		shippingInfo &&
		`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`;

	return (
		<Fragment>
			<MetaData title={'Order Details'} />

			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<div
						className='row d-flex justify-content-between'
						id='order-details'
					>
						<div className='col-12 col-lg-8 mt-5 order-details'>
							<h1 className='my-5'>Order # {order._id}</h1>

							<h4 className='mb-4'>Shipping Info</h4>
							<p>
								<b>Name:</b> {user && user.name}
							</p>
							<p>
								<b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}
							</p>
							<p className='mb-4'>
								<b>Address:</b>
								{shippingDetails}
							</p>
							<p>
								<b>Amount:</b> ${totalPrice}
							</p>

							<hr />

							<h4 className='my-4'>Order Status:</h4>
							<p
								className={
									order.orderStatus &&
									String(order.orderStatus).includes('Delivered')
										? 'greenColor'
										: 'redColor'
								}
							>
								<b>{orderStatus}</b>
							</p>

							<h4 className='my-4'>Order Items:</h4>

							<hr />
							<div className='cart-item my-1'>
								{orderItems &&
									orderItems.map(item => (
										<div key={item.product} className='row my-5'>
											<div className='col-4 col-lg-2'>
												<img
													src={item.image}
													alt={item.name}
													height='45'
													width='65'
												/>
											</div>

											<div className='col-5 col-lg-5'>
												<Link to={`/products/${item.product}`}>
													{item.name}
												</Link>
											</div>

											<div className='col-4 col-lg-2 mt-4 mt-lg-0'>
												<p>${item.price}</p>
											</div>

											<div className='col-4 col-lg-3 mt-4 mt-lg-0'>
												<p>{item.quantity} Piece(s)</p>
											</div>
										</div>
									))}
							</div>
							<hr />
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default OrderDetails;
