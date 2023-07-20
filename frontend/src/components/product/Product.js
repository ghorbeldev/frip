import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../../redux/features/product-details/productDetailsSlice';
import Loader from '../loader/Loader';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import './product.scss';
import { addItemToCart } from '../../redux/features/cart/cartSlice';
const Product = () => {
	const alert = useAlert();
	let { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, details } = useSelector(
		state => state.productDetails
	);
	useEffect(() => {
		if (error) return alert.error(error);
		dispatch(fetchProductDetails(id));
	}, [dispatch, id, error, alert]);

	const addToCart = () => {
		dispatch(addItemToCart({ id, quantity: 1 }));
		alert.success('Item Added Successfully');
	};
	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<MetaData title={details.name} />
					<div className='product-wrapper'>
						<div
							className='col-12 col-lg-5 img-fluid product-wrapper__image'
							id='product_image'
						>
							<Carousel pause='hover'>
								{details.images &&
									details.images.map(image => (
										<Carousel.Item key={image.public_id}>
											<img
												className='d-block w-100'
												src={image.url}
												alt={details.title}
											/>
										</Carousel.Item>
									))}
							</Carousel>
						</div>

						<div className='col-12 col-lg-5 product-wrapper__details'>
							<h3 className='product_name'>{details.name}</h3>
							<p id='product_id'>Product # {details._id}</p>
							<hr />
							<p id='product_price'>${details.price}</p>

							<button
								type='button'
								id='cart_btn'
								className='btn slide d-inline ml-4'
								disabled={details.stock === 0}
								onClick={addToCart}
							>
								Add to Cart
							</button>

							<hr />

							<p>
								Status:
								<span
									id='stock_status'
									className={details.stock > 0 ? 'greenColor' : 'redColor'}
								>
									{details.stock > 0 ? 'In Stock' : 'Out of Stock'}
								</span>
							</p>

							<hr />

							<h4 className='product-description mt-2'>Description:</h4>
							<p>{details.description}</p>
							<hr />
							<p id='product_seller mb-3'>
								Sold by: <strong>{details.seller}</strong>
							</p>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Product;
