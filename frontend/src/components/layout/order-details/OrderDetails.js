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
import CustomTable from '../../CustomTable/CustomTable';

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
								<b>Amount:</b> {totalPrice}DT
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
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default OrderDetails;
