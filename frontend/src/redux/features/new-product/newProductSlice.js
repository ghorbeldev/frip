import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	success: false,
	product: {},
	error: '',
};
export const newProduct = createAsyncThunk(
	'newProduct/newProduct',
	async data => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.post(
				`/api/v1/admin/product/new`,
				data,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const newProductSlice = createSlice({
	name: 'newProduct',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		newProductReset: state => {
			state.loading = false;
			state.success = false;
			state.product = {};
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(newProduct.pending, state => {
			state.loading = true;
			state.success = false;
			state.product = {};
			state.error = null;
		});
		builder.addCase(newProduct.fulfilled, (state, action) => {
			state.loading = false;
			state.product = action.payload.product;
			state.success = action.payload.success;
			state.error = null;
		});
		builder.addCase(newProduct.rejected, (state, action) => {
			state.loading = false;
			state.product = {};
			state.success = false;

			console.log(action);
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors, newProductReset } = newProductSlice.actions;
export default newProductSlice.reducer;
