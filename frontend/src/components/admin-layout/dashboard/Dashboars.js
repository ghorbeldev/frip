import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../../loader/Loader';
import MetaData from '../../layout/MetaData';
import './dashboars.scss';
import { getAdminProducts } from '../../../redux/features/products/productsSlice';
import { allOrders } from '../../../redux/features/allOrders/allOrdersSlice';
import { allUsers } from '../../../redux/features/allUsers/allUsersSlice';
const Dashboard = () => {
	const dispatch = useDispatch();
	let outOfStock = 0;

	const { products } = useSelector(state => state.products);
	const { users } = useSelector(state => state.allUsers);
	const { orders, totalAmount, loading } = useSelector(
		state => state.allOrders
	);
	console.log('waiting...');
	products.forEach(product => {
		if (product.stock === 0) {
			outOfStock += 1;
		}
	});
	useEffect(() => {
		dispatch(getAdminProducts());
		dispatch(allOrders());
		dispatch(allUsers());
	}, [dispatch]);

	return (
		<Fragment>
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10' id='dashboard'>
					<h1 className='my-4'>Dashboard</h1>

					{loading ? (
						<Loader />
					) : (
						<Fragment>
							<MetaData title={'Admin Dashboard'} />

							<div className='dashboard-details'>
								<div className='card text-white bg-primary o-hidden'>
									<div className='card-body '>
										<div className='text-center total card-font-size'>
											Total Amount
											<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
										</div>
									</div>
								</div>
								<div className='dashboard-details__info'>
									<div className='card text-white bg-success o-hidden'>
										<div className='card-body'>
											<div className='text-center card-font-size'>
												Products
												<br /> <b>{products && products.length}</b>
											</div>
										</div>
										<Link
											className='card-footer text-white clearfix small z-1'
											to='/admin/products'
										>
											<span className='float-left'>View Details</span>
											<span className='float-right'>
												<i className='fa fa-angle-right'></i>
											</span>
										</Link>
									</div>

									<div className='card text-white bg-danger o-hidden'>
										<div className='card-body'>
											<div className='text-center card-font-size'>
												Orders
												<br /> <b>{orders && orders.length}</b>
											</div>
										</div>
										<Link
											className='card-footer text-white clearfix small z-1'
											to='/admin/orders'
										>
											<span className='float-left'>View Details</span>
											<span className='float-right'>
												<i className='fa fa-angle-right'></i>
											</span>
										</Link>
									</div>

									<div className='card text-white bg-info o-hidden'>
										<div className='card-body'>
											<div className='text-center card-font-size'>
												Users
												<br /> <b>{users && users.length}</b>
											</div>
										</div>
										<Link
											className='card-footer text-white clearfix small z-1'
											to='/admin/users'
										>
											<span className='float-left'>View Details</span>
											<span className='float-right'>
												<i className='fa fa-angle-right'></i>
											</span>
										</Link>
									</div>

									<div className='card text-white bg-warning o-hidden'>
										<div className='card-body'>
											<div className='text-center card-font-size'>
												Out of Stock
												<br /> <b>{outOfStock}</b>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	);
};

export default Dashboard;
