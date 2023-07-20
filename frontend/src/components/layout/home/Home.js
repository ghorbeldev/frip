import React, { useEffect } from 'react';
import './home.scss';
import Card from '../card/Card';
import MetaData from '../MetaData';
import { fetchProducts } from '../../../redux/features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

const Home = () => {
	const dispatch = useDispatch();
	const { loading, products, error } = useSelector(state => state.products);
	const alert = useAlert();
	console.log(error);
	useEffect(() => {
		if (error) {
			return alert.error(error);
		}
		dispatch(fetchProducts());
	}, [error]);
	return (
		<>
			<MetaData title={'Home'} />
			<div id='home'>
				{loading ? (
					<Loader />
				) : (
					<>
						<div className='latest'>
							<h1>Check Our Latest Products</h1>
							<div className='latest__products'>
								{products.length
									? products.map(product => (
											<Card
												productName={product.name}
												img={product.images[0]}
												price={product.price}
												size={product.size}
												id={product._id}
												key={product._id}
												stock={product.stock}
											/>
									  ))
									: null}
							</div>
						</div>
						<div className='continue-shopping'>
							<button>
								<Link to='/shop'>Continue Shopping</Link>
							</button>
						</div>
						<div className='category-wrapper'>
							<h1>Choose a Category And Continue Browsing</h1>
							<ul>
								<li>
									<Link to='/shop?category=men'>
										<img src='/images/men.jpg' alt='Men' />
										<span>Men</span>
									</Link>
								</li>
								<li>
									<Link to='/shop?category=kids'>
										<img src='/images/women.webp' alt='Women' />
										<span>Women</span>
									</Link>
								</li>
								<li>
									<Link to='/shop?category=women'>
										<img src='/images/kid.jpg' alt='Kid' />
										<span>Kids</span>
									</Link>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Home;
