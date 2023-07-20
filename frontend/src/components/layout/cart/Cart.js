import React, { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../MetaData';
import './Cart.scss';
import {
	removeItemFromCart,
	updateCartItems,
} from '../../../redux/features/cart/cartSlice';
import { AiOutlineDelete } from 'react-icons/ai';
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
	console.log(cartItems);
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
							{cartItems.map(item => {
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
							})}
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
