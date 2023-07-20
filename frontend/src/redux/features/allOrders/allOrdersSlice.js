import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	orders: [],
	totalAmount: null,
	error: null,
};

export const allOrders = createAsyncThunk('allOrders/allOrders', async () => {
	try {
		const response = await axios.get('/api/v1/admin/orders');
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});

const allOrdersSLice = createSlice({
	name: 'allOrders',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(allOrders.pending, (state, action) => {
			state.loading = true;
			state.orders = [];
			state.totalAmount = null;
			state.error = null;
		});
		builder.addCase(allOrders.fulfilled, (state, action) => {
			state.loading = false;
			state.orders = action.payload.orders;
			state.totalAmount = action.payload.totalAmount;

			state.error = null;
		});
		builder.addCase(allOrders.rejected, (state, action) => {
			state.loading = false;
			state.orders = [];
			console.log(action.error);
			state.error = action.error.message;
			state.totalAmount = null;

			state.error = action.error.message;
		});
	},
});

export const { clearErrors } = allOrdersSLice.actions;
export default allOrdersSLice.reducer;
