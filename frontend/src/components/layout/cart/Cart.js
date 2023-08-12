import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './Cart.scss';
import {
	removeItemFromCart,
	updateCartItems,
} from '../../../redux/features/cart/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
const Cart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { cartItems } = useSelector(state => state.cart);

	const removeCartItemHandler = id => {
		dispatch(removeItemFromCart(id));
	};

	const checkoutHandler = () => {
		navigate('/login?redirect=shipping');
	};
	useEffect(() => {
		dispatch(updateCartItems());
	}, [dispatch]);
	const setCartItems = () => {
		const data = {
			columns: [
				{
					label: 'Preview',
					field: 'preview',
					sort: 'asc',
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
					label: 'Stock',
					field: 'stock',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		cartItems.forEach(item => {
			data.rows.push({
				preview: item.image,
				name: item.name,
				price: `${item.price}DT`,
				stock: item.stock,
				actions: (
					<Fragment>
						<button
							className='btn btn-danger py-1 px-2 ml-2'
							onClick={() => removeCartItemHandler(item.product)}
						>
							<FaTrash />
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};
	const cartItemsData = setCartItems();

	return (
		<div className='cart' id='cart'>
			<MetaData title={'Your Cart'} />
			{cartItems.length === 0 ? (
				<h2 className='mt-5'>Your Cart is Empty</h2>
			) : (
				<Fragment>
					<h2 className='mt-5'>
						Your Cart: <b>{cartItems.length} items</b>
					</h2>

					<div className='row d-flex justify-content-between'>
						<div className='col-12 col-lg-8'>
							{/* {cartItems.map(item => {
								return (
									<Fragment key={item.product}>
										<div className='cart-item' key={item.product}>
											<div>
												<img
													src={item.image}
													alt={item.name}
													height='90'
													width='115'
												/>
											</div>

											<div>
												<Link to={`/products/${item.product}`}>
													{item.name}
												</Link>
											</div>

											<div>
												<p id='card_item_price'>{item.price}DT</p>
											</div>
											<div>
												{
													<span
														id='stock_status'
														className={
															item.stock > 0 ? 'greenColor' : 'redColor'
														}
													>
														{item.stock > 0 ? 'In Stock' : 'Out of Stock'}
													</span>
												}
											</div>
											<div onClick={() => removeCartItemHandler(item.product)}>
												<AiOutlineDelete
													className='text-danger'
													size={20}
													style={{ cursor: 'pointer' }}
												/>
											</div>
										</div>
									</Fragment>
								);
							})} */}
							<Table className='custom-table'>
								<Thead>
									<Tr>
										{cartItemsData.columns.map(column => (
											<Th key={column.label}>{column.label}</Th>
										))}
									</Tr>
								</Thead>
								<Tbody>
									{cartItemsData.rows.map((row, indx) => (
										<Tr key={indx}>
											{Object.values(row).map((v, i) => {
												if (i === 0)
													return (
														<Td key={i}>
															<img
																src={v}
																alt={row.name}
																height='90'
																width='115'
															/>
														</Td>
													);
												return <Td key={i}>{v}</Td>;
											})}
										</Tr>
									))}
								</Tbody>
							</Table>
						</div>

						<div className='col-12 col-lg-3 my-4'>
							<div id='order_summary'>
								<h4>Order Summary</h4>

								<p>
									Subtotal:{' '}
									<span className='order-summary-values'>
										{cartItems.reduce(
											(acc, item) => acc + Number(item.quantity),
											0
										)}{' '}
										(Units)
									</span>
								</p>
								<p>
									Est. total:{' '}
									<span className='order-summary-values'>
										{cartItems
											.reduce(
												(acc, item) => acc + item.quantity * item.price,
												0
											)
											.toFixed(2)}
										DT
									</span>
								</p>

								<button
									id='checkout_btn'
									className='btn btn-primary btn-block'
									onClick={checkoutHandler}
								>
									Check out
								</button>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Cart;
