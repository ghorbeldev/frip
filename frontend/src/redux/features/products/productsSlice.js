import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	productsCount: null,
	filteredProductsLength: null,
	products: [],
	error: '',
	resPerPage: null,
};
export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async obj => {
		try {
			const response = await axios.get(
				`/api/v1/products${
					obj
						? `?keyword=${obj.keyword}&page=${obj.currentPage}${
								obj.category ? `&category=${obj.category}` : ''
						  }`
						: ''
				}`
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const getAdminProducts = createAsyncThunk(
	'products/getAdminProducts',
	async () => {
		try {
			const response = await axios.get(`/api/v1/admin/products`);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProducts.pending, state => {
			state.loading = true;
			state.productsCount = null;
			state.filteredProductsLength = null;
			state.products = [];
			state.resPerPage = null;
			state.error = null;
		});
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload.products;
			state.productsCount = action.payload.productsCount;
			state.filteredProductsLength = action.payload.filteredProductsLength;
			state.resPerPage = action.payload.resPerPage;
			state.error = null;
		});
		builder.addCase(fetchProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Internal Server Error';
			state.resPerPage = null;
			state.productsCount = null;
			state.filteredProductsLength = null;
		});
		builder.addCase(getAdminProducts.pending, state => {
			state.loading = true;
			state.productsCount = null;
			state.filteredProductsLength = null;
			state.products = [];
			state.resPerPage = null;
			state.error = null;
		});
		builder.addCase(getAdminProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload.products;
			state.error = null;
		});
		builder.addCase(getAdminProducts.rejected, (state, action) => {
			state.loading = false;
			state.products = [];
			state.error = action.error.message || 'Internal Server Error';
			state.resPerPage = null;
			state.productsCount = null;
			state.filteredProductsLength = null;
		});
	},
});
export const { clearErrors } = productsSlice.actions;
export default productsSlice.reducer;
