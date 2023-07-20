import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	order: {},
	error: null,
};

export const getOrderDetails = createAsyncThunk(
	'orderDetails/getOrderDetails',
	async id => {
		try {
			const response = await axios.get(`/api/v1/order/${id}`);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const orderDetailsSLice = createSlice({
	name: 'orderDetails',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(getOrderDetails.pending, (state, action) => {
			state.loading = true;
			state.order = {};
			state.error = null;
		});
		builder.addCase(getOrderDetails.fulfilled, (state, action) => {
			state.loading = false;
			state.order = action.payload.order;
			state.error = null;
		});
		builder.addCase(getOrderDetails.rejected, (state, action) => {
			state.loading = false;
			state.order = {};
			state.error = action.error.message;
		});
	},
});

export const { clearErrors } = orderDetailsSLice.actions;
export default orderDetailsSLice.reducer;
