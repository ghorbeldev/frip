import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	details: {},
	error: '',
};
export const fetchProductDetails = createAsyncThunk(
	'productDetails/fetchProductDetails',
	async id => {
		try {
			const response = await axios.get(`/api/v1/product/${id}`);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const productDetailsSlice = createSlice({
	name: 'productDetails',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		productDetailsReset: state => {
			state.loading = false;
			state.details = {};
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchProductDetails.pending, state => {
			state.loading = true;
			state.details = {};
			state.error = null;
		});
		builder.addCase(fetchProductDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.details = action.payload.product;
			state.error = null;
		});
		builder.addCase(fetchProductDetails.rejected, (state, action) => {
			state.loading = false;
			state.details = {};
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});
export const { clearErrors, productDetailsReset } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
