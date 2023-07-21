import React, { Fragment, useState, useEffect, useCallback } from 'react';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	fetchProductDetails,
	productDetailsReset,
} from '../../../redux/features/product-details/productDetailsSlice';
import {
	updateProductReset,
	clearErrors as clearProductErrors,
	updateProduct,
} from '../../../redux/features/product/productSlice';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../../layout/MetaData';
import Sidebar from '../sidebar/Sidebar';

const UpdateProduct = () => {
	const {
		error,
		details,
		loading: loadingDetails,
	} = useSelector(state => state.productDetails);
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');
	const [size, setSize] = useState('');
	const [stock, setStock] = useState(0);
	const [seller, setSeller] = useState('');
	const [images, setImages] = useState([]);

	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const categories = ['men', 'women', 'kids'];
	const sizes = ['s', 'm', 'l', 'xl', 'xxl'];

	const alert = useAlert();
	const dispatch = useDispatch();
	const setInitialStates = useCallback(() => {
		setName(details.name);
		setPrice(details.price);
		setDescription(details.description);
		setCategory(details.category);
		setSize(details.size);
		setSeller(details.seller);
		setStock(details.stock);
		setOldImages(details.images);
	}, [loadingDetails]);
	const {
		loading,
		error: updateError,
		isUpdated,
	} = useSelector(state => state.product);

	const params = useParams();
	const productId = params.id;
	useEffect(() => {
		if (details._id !== productId) {
			dispatch(fetchProductDetails(productId));
		}
		setInitialStates();
		return () => {
			dispatch(productDetailsReset());
		};
	}, [loadingDetails]);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearProductErrors());
		}

		if (isUpdated) {
			navigate('/admin/products');
			alert.success('Product updated successfully');
			dispatch(updateProductReset());
		}
	}, [dispatch, alert, error, updateError, isUpdated, navigate]);

	const submitHandler = e => {
		e.preventDefault();

		// const formData = new FormData();
		// formData.set('name', name);
		// formData.set('price', price);
		// formData.set('description', description);
		// formData.set('category', category);
		// formData.set('size', size);
		// formData.set('stock', stock);
		// formData.set('seller', seller);

		// images.forEach(image => {
		// 	formData.append('images', image);
		// });

		dispatch(
			updateProduct({
				id: details._id,
				data: {
					name,
					price,
					description,
					category,
					size,
					stock,
					seller,
					images,
				},
			})
		);
	};

	const onChange = e => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);
		setOldImages([]);

		files.forEach(file => {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setImagesPreview(oldArray => [...oldArray, reader.result]);
					setImages(oldArray => [...oldArray, reader.result]);
				}
			};

			reader.readAsDataURL(file);
		});
	};

	return (
		<Fragment>
			<MetaData title={'Update Product'} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 wrapper'>
					<Fragment>
						<div className='wrapper my-5'>
							<form
								className='shadow-lg'
								onSubmit={submitHandler}
								encType='multipart/form-data'
							>
								<h1 className='mb-4'>Update Product</h1>

								<div className='form-group'>
									<label htmlFor='name_field'>Name</label>
									<input
										type='text'
										id='name_field'
										className='form-control'
										value={name}
										onChange={e => setName(e.target.value)}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='price_field'>Price</label>
									<input
										type='text'
										id='price_field'
										className='form-control'
										value={price}
										onChange={e => setPrice(e.target.value)}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='description_field'>Description</label>
									<textarea
										className='form-control'
										id='description_field'
										rows='8'
										value={description}
										onChange={e => setDescription(e.target.value)}
									></textarea>
								</div>

								<div className='form-group'>
									<label htmlFor='category_field'>Category</label>
									<select
										className='form-control'
										id='category_field'
										value={category}
										onChange={e => setCategory(e.target.value)}
									>
										{categories.map(category => (
											<option key={category} value={category}>
												{category}
											</option>
										))}
									</select>
								</div>
								<div className='form-group'>
									<label htmlFor='category_field'>Size</label>
									<select
										className='form-control'
										id='size_field'
										value={size}
										onChange={e => setSize(e.target.value)}
									>
										{sizes.map(s => (
											<option key={s} value={s}>
												{s}
											</option>
										))}
									</select>
								</div>
								<div className='form-group'>
									<label htmlFor='stock_field'>Stock</label>
									<input
										type='number'
										id='stock_field'
										className='form-control'
										value={stock}
										onChange={e => setStock(e.target.value)}
									/>
								</div>

								<div className='form-group'>
									<label htmlFor='seller_field'>Seller Name</label>
									<input
										type='text'
										id='seller_field'
										className='form-control'
										value={seller}
										onChange={e => setSeller(e.target.value)}
									/>
								</div>

								<div className='form-group'>
									<label>Images</label>

									<div className='custom-file'>
										<input
											type='file'
											name='product_images'
											className='custom-file-input'
											id='customFile'
											onChange={onChange}
											multiple
										/>
										<label className='custom-file-label' htmlFor='customFile'>
											Choose Images
										</label>
									</div>

									{oldImages &&
										oldImages.map(img => (
											<img
												key={img.public_id}
												src={img.url}
												alt={img.url}
												className='mt-3 mr-2'
												width='55'
												height='52'
											/>
										))}

									{imagesPreview.map(img => (
										<img
											src={img}
											key={img.public_id}
											alt='Images Preview'
											className='mt-3 mr-2'
											width='55'
											height='52'
										/>
									))}
								</div>

								<button
									id='login_button'
									type='submit'
									className='btn btn-block py-3'
									disabled={loading ? true : false}
								>
									UPDATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProduct;
