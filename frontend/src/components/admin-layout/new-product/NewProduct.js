import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	clearErrors,
	newProduct,
	newProductReset,
} from '../../../redux/features/new-product/newProductSlice';
import MetaData from '../../layout/MetaData';
import Sidebar from '../sidebar/Sidebar';

const NewProduct = () => {
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('men');
	const [size, setSize] = useState('s');
	const [stock, setStock] = useState(0);
	const [seller, setSeller] = useState('');
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const navigate = useNavigate();
	const categories = ['men', 'women', 'kids'];
	const sizes = ['s', 'm', 'l', 'xl', 'xxl'];

	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, success } = useSelector(state => state.newProduct);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			navigate('/admin/products');
			alert.success('Product created successfully');
			dispatch(newProductReset());
		}
	}, [dispatch, alert, error, success, navigate]);

	const submitHandler = e => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('name', name);
		formData.set('price', price);
		formData.set('description', description);
		formData.set('category', category);
		formData.set('size', size);
		formData.set('stock', stock);
		formData.set('seller', seller);

		images.forEach(image => {
			formData.append('images', image);
		});
		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		dispatch(newProduct(formData));
	};
	const onChange = e => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);

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
			<MetaData title={'New Product'} />
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
								<h1 className='mb-4'>New Product</h1>

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
										{categories.map(c => (
											<option key={c} value={c}>
												{c}
											</option>
										))}
									</select>
								</div>
								<div className='form-group'>
									<label htmlFor='category_field'>Sizes</label>
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

									{imagesPreview.map(img => (
										<img
											src={img}
											key={img}
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
									CREATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default NewProduct;
