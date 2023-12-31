import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import MetaData from '../../layout/MetaData';
import Loader from '../../loader/Loader';
import { getOrderDetails } from '../../../redux/features/order-details/orderDetailsSlice';
import {
	clearErrors,
	updateOrder,
	updateOrderReset,
} from '../../../redux/features/order/orderSlice';
import CustomTable from '../../CustomTable/CustomTable';

const ProcessOrder = () => {
	const params = useParams();
	const [status, setStatus] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, order = {} } = useSelector(state => state.orderDetails);
	const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;
	const { error, isUpdated } = useSelector(state => state.order);

	const orderId = params.id;

	useEffect(() => {
		dispatch(getOrderDetails(orderId));

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('Order updated successfully');
			dispatch(updateOrderReset());
		}
	}, [dispatch, alert, error, isUpdated, orderId]);

	const updateOrderHandler = id => {
		const formData = new FormData();
		formData.set('status', status);

		dispatch(updateOrder({ id: id, orderData: formData }));
	};

	const shippingDetails =
		shippingInfo &&
		`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}`;

	const setOrderItems = () => {
		const data = {
			columns: [
				{
					label: 'Preview',
					field: 'preview',
					sort: 'asc',
					type: 'img',
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc',
				},
				{
					label: 'Price',
					field: 'price',
					sort: 'asc',
				},
				{
					label: 'Quantity',
					field: 'quantity',
					sort: 'asc',
				},
			],
			rows: [],
		};
		if (orderItems) {
			orderItems.forEach(item => {
				data.rows.push({
					preview: (
						<img src={item.image} alt={item.name} height='90' width='115' />
					),
					name: item.name,
					price: `${item.price}DT`,
					quantity: item.quantity,
				});
			});
		}

		return data;
	};
	const orderItemsData = setOrderItems();

	return (
		<Fragment>
			<MetaData title={`Process Order # ${order && order._id}`} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10'>
					<Fragment>
						{loading ? (
							<Loader />
						) : (
							<div className='row d-flex justify-content-around'>
								<div className='col-12 col-lg-7 order-details mt-header'>
									<h2 className='my-5'>Order # {order._id}</h2>

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
									{orderItems && <CustomTable data={orderItemsData} />}
									<hr />
								</div>

								<div className='col-12 col-lg-3 mt-5'>
									<h4 className='my-4'>Status</h4>

									<div className='form-group'>
										<select
											className='form-control'
											name='status'
											value={status}
											onChange={e => setStatus(e.target.value)}
										>
											<option value='Processing'>Processing</option>
											<option value='Shipped'>Shipped</option>
											<option value='Delivered'>Delivered</option>
										</select>
									</div>

									<button
										className='btn btn-primary btn-block'
										onClick={() => updateOrderHandler(order._id)}
									>
										Update Status
									</button>
								</div>
							</div>
						)}
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default ProcessOrder;
