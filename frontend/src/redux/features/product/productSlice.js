import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	isDeleted: false,
	isUpdated: false,
	error: '',
};
export const deleteProduct = createAsyncThunk(
	'product/deleteProduct',
	async id => {
		try {
			const response = await axios.delete(`/api/v1/admin/product/${id}`);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

export const updateProduct = createAsyncThunk(
	'product/updateProduct',
	async product => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			console.log(product);
			const response = await axios.put(
				`/api/v1/admin/product/${product.id}`,
				product.data,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		deleteProductReset: state => {
			state.error = initialState.error;
			state.loading = initialState.loading;
			state.isDeleted = initialState.isDeleted;
		},
		updateProductReset: state => {
			state.error = '';
			state.isUpdated = false;
			state.loading = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(deleteProduct.pending, state => {
			state.loading = true;
			state.isDeleted = false;
			state.error = null;
		});
		builder.addCase(deleteProduct.fulfilled, (state, action) => {
			state.loading = false;
			state.isDeleted = action.payload.success;
			state.error = null;
		});
		builder.addCase(deleteProduct.rejected, (state, action) => {
			state.loading = false;
			state.isDeleted = false;
			state.error = action.error.message;
		});
		builder.addCase(updateProduct.pending, state => {
			state.loading = true;
			state.isUpdated = false;
			state.error = null;
		});
		builder.addCase(updateProduct.fulfilled, (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload.success;
			state.error = null;
		});
		builder.addCase(updateProduct.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			console.log(action);
			state.error = action.error.message;
		});
	},
});

export const { clearErrors, deleteProductReset, updateProductReset } =
	productSlice.actions;
export default productSlice.reducer;
