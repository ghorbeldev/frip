import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearErrors,
	getAdminProducts,
} from '../../../redux/features/products/productsSlice';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import MetaData from '../../layout/MetaData';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../../loader/Loader';
import {
	deleteProduct,
	deleteProductReset,
} from '../../../redux/features/product/productSlice';
import CustomTable from '../../CustomTable/CustomTable';

const ProductsList = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, products } = useSelector(state => state.products);
	const { error: deleteError, isDeleted } = useSelector(state => state.product);
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getAdminProducts());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			alert.success('Product deleted successfully');
			navigate('/admin/products');
			dispatch(deleteProductReset());
		}
	}, [dispatch, alert, error, deleteError, isDeleted, navigate]);

	const setProducts = () => {
		const data = {
			columns: [
				{
					label: 'ID',
					field: 'id',
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

		products.forEach(product => {
			data.rows.push({
				id: product._id,
				name: product.name,
				price: `${product.price}DT`,
				stock: product.stock,
				actions: (
					<Fragment>
						<Link
							to={`/admin/product/${product._id}`}
							className='btn btn-primary py-1 px-2'
						>
							<FaPencilAlt />
						</Link>
						<button
							className='btn btn-danger py-1 px-2 ml-2'
							style={{ marginLeft: '.6rem' }}
							onClick={() => deleteProductHandler(product._id)}
						>
							<FaTrash />
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	const deleteProductHandler = id => {
		dispatch(deleteProduct(id));
	};

	return (
		<Fragment>
			<MetaData title={'All Products'} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 mt-header-lg'>
					<div className='container'>
						<h1 className='my-5'>All Products</h1>

						{loading ? <Loader /> : <CustomTable data={setProducts()} />}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default ProductsList;
