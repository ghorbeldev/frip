import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	isUpdated: false,
	isDeleted: false,
	error: null,
};

export const updateOrder = createAsyncThunk(
	'order/updateOrder',
	async order => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await axios.put(
				`/api/v1/admin/order/${order.id}`,
				order.orderData,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const deleteOrder = createAsyncThunk('order/deleteOrder', async id => {
	try {
		const response = await axios.delete(`/api/v1/admin/order/${id}`);
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});

const orderSlice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		updateOrderReset: state => {
			state.isUpdated = initialState.isUpdated;
			state.error = initialState.error;
			state.loading = initialState.loading;
		},
		deleteOrderReset: state => {
			state.isDeleted = initialState.isDeleted;
			state.error = initialState.error;
			state.loading = initialState.loading;
		},
	},
	extraReducers: builder => {
		builder.addCase(updateOrder.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = null;
		});
		builder.addCase(updateOrder.fulfilled, (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload.success;
			state.isDeleted = false;
			state.error = null;
		});
		builder.addCase(updateOrder.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = action.error.message || 'Internal Server Error';
		});
		builder.addCase(deleteOrder.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = null;
		});
		builder.addCase(deleteOrder.fulfilled, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.isDeleted = action.payload.success;
			state.error = null;
		});
		builder.addCase(deleteOrder.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors, updateOrderReset, deleteOrderReset } =
	orderSlice.actions;
export default orderSlice.reducer;
