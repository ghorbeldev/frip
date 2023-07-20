import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	allOrders,
	clearErrors,
} from '../../../redux/features/allOrders/allOrdersSlice';
import { FaEye, FaTrash } from 'react-icons/fa';
import MetaData from '../../layout/MetaData';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../../loader/Loader';
import {
	deleteOrder,
	deleteOrderReset,
} from '../../../redux/features/order/orderSlice';
import CustomTable from '../../CustomTable/CustomTable';

const OrdersList = () => {
	const navigate = useNavigate();

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, orders } = useSelector(state => state.allOrders);
	const { isDeleted } = useSelector(state => state.order);

	useEffect(() => {
		dispatch(allOrders());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success('Order deleted successfully');
			navigate('/admin/orders');
			dispatch(deleteOrderReset());
		}
	}, [dispatch, alert, error, isDeleted, navigate]);

	const deleteOrderHandler = id => {
		dispatch(deleteOrder(id));
	};

	const setOrders = () => {
		const data = {
			columns: [
				{
					label: 'Order ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'No of Items',
					field: 'numofItems',
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
				},
			],
			rows: [],
		};

		orders.forEach(order => {
			data.rows.push({
				id: order._id,
				numofItems: order.orderItems.length,
				amount: `$${order.totalPrice}`,
				status:
					order.orderStatus &&
					String(order.orderStatus).includes('Delivered') ? (
						<p style={{ color: 'green' }}>{order.orderStatus}</p>
					) : (
						<p style={{ color: 'red' }}>{order.orderStatus}</p>
					),
				actions: (
					<Fragment>
						<Link
							to={`/admin/order/${order._id}`}
							className='btn btn-primary py-1 px-2'
						>
							<FaEye />
						</Link>
						<button
							className='btn btn-danger py-1 px-2 ml-2'
							style={{ marginLeft: '.6rem' }}
							onClick={() => deleteOrderHandler(order._id)}
						>
							<FaTrash />
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'All Orders'} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 mt-header-lg'>
					<div className='container'>
						<h1 className='my-5'>All Orders</h1>

						{loading ? <Loader /> : <CustomTable data={setOrders()} />}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default OrdersList;
