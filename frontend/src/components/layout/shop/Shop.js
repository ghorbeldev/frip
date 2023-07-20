import React, { useEffect, useState } from 'react';
import './shop.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { fetchProducts } from '../../../redux/features/products/productsSlice';
import Card from '../card/Card';
import Loader from '../../loader/Loader';
import Pagination from 'react-js-pagination';
import { useSearchParams } from 'react-router-dom';

const Shop = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchParams, setSearchParams] = useSearchParams();

	const [category, setCategory] = useState('');
	const [size, setSize] = useState('all');
	const setCurrentPageNumber = pageNumber => {
		document.body.scrollTo(0, 0);
		setCurrentPage(pageNumber);
	};
	const { loading, products, error, filteredProductsLength, resPerPage } =
		useSelector(state => state.products);
	const alert = useAlert();
	const handleCatgeory = e => {
		setCategory(e.target.value);
	};
	useEffect(() => {
		if (error) {
			return alert.error(error);
		}
		dispatch(
			fetchProducts({
				keyword: searchParams.get('keyword')?.trim() || '',
				currentPage,
				category: searchParams.get('category') || category,
				size: searchParams.get('size')?.trim() || '',
			})
		);
	}, [dispatch, error, alert, currentPage, searchParams, category]);
	return (
		<div id='shop'>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='shop-wrapper'>
						{/* <div className='filter'>
							<div className='filter__category radio-container'>
								<h2>Filter By Category</h2>
								<label class=''>
									<input
										type='radio'
										name='category'
										class='d-none'
										value=''
										onChange={handleCatgeory}
									/>
									<span class='text-center d-block'>All</span>
								</label>
								<label class=''>
									<input
										type='radio'
										name='category'
										class='d-none'
										value='men'
										onChange={handleCatgeory}
									/>
									<span class='text-center d-block'>Men</span>
								</label>
								<label class=''>
									<input
										type='radio'
										name='category'
										class='d-none'
										value='women'
										onChange={handleCatgeory}
									/>
									<span class='text-center d-block'>Women</span>
								</label>
								<label class=''>
									<input
										type='radio'
										name='category'
										class='d-none'
										value='kids'
										onChange={handleCatgeory}
									/>
									<span class='text-center d-block'>Kids</span>
								</label>
							</div>
							<div className='filter__size radio-container'>
								<h2>Filter By Size</h2>
								<label class=''>
									<input type='radio' name='toggle' class='d-none' />
									<span class='text-center d-block'>s</span>
								</label>
								<label class=''>
									<input type='radio' name='toggle' class='d-none' />
									<span class='text-center d-block'>m</span>
								</label>
								<label class=''>
									<input type='radio' name='toggle' class='d-none' />
									<span class='text-center d-block'>l</span>
								</label>
							</div>
						</div> */}
						<div className='products-container'>
							{products.length
								? products.map(product => (
										<>
											<Card
												productName={product.name}
												img={product.images[0]}
												key={product._id}
												price={product.price}
												size={product.size}
												id={product._id}
												stock={product.stock}
											/>
										</>
								  ))
								: null}
						</div>
					</div>
					{resPerPage < filteredProductsLength && (
						<div className='pagination'>
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resPerPage}
								totalItemsCount={filteredProductsLength}
								onChange={setCurrentPageNumber}
								itemClass='page-item'
								linkClass='page-link'
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Shop;
