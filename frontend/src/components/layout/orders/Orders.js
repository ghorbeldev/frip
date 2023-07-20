import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	fetchLoggedInUserOrders,
} from '../../../redux/features/user-orders/userOrdersSlice';
import './orders.scss';
import MetaData from '../MetaData';
import Loader from '../../loader/Loader';
import { AiFillEye } from 'react-icons/ai';
import CustomTable from '../../CustomTable/CustomTable';

const Orders = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, orders } = useSelector(state => state.userOrders);
	useEffect(() => {
		dispatch(fetchLoggedInUserOrders());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error]);

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: 'Order ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Num of Items',
					field: 'numOfItems',
					sort: 'asc',
				},
				{
					label: 'Amount',
					field: 'amount',
					sort: 'asc',
				},
				{
					label: 'Status',
					field: 'status',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
					sort: 'asc',
				},
			],
			rows: [],
		};

		orders.forEach(order => {
			data.rows.push({
				id: order._id,
				numOfItems: order.orderItems.length,
				amount: `${order.totalPrice}DT`,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes('Delivered') ? (
						<p style={{ color: 'green' }}>{order.orderStatus}</p>
					) : (
						<p style={{ color: 'red' }}>{order.orderStatus}</p>
					),
				actions: (
					<Link to={`/order/${order._id}`} className='btn btn-primary'>
						<AiFillEye color='white' />
					</Link>
				),
			});
		});

		return data;
	};
	return (
		<div className='container' id={'orders-list'}>
			<MetaData title={'My Orders'} />

			<h1 className='orders-header'>My Orders</h1>

			{loading ? <Loader /> : <CustomTable data={setOrders()} />}
		</div>
	);
};

export default Orders;
