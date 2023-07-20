import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	orders: [],
	error: null,
};

export const fetchLoggedInUserOrders = createAsyncThunk(
	'userOrders/fetchLoggedInUserOrders',
	async () => {
		try {
			const response = await axios.get('/api/v1/orders/me');
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const userOrdersSlice = createSlice({
	name: 'userOrders',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchLoggedInUserOrders.pending, (state, action) => {
			state.loading = true;
			state.orders = [];
			state.error = null;
		});
		builder.addCase(fetchLoggedInUserOrders.fulfilled, (state, action) => {
			state.loading = false;
			state.orders = action.payload.orders;
			state.error = null;
		});
		builder.addCase(fetchLoggedInUserOrders.rejected, (state, action) => {
			state.loading = false;
			state.orders = [];
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
