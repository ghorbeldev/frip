import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	order: {},
	error: null,
};

export const createOrder = createAsyncThunk(
	'newOrder/createOrder',
	async order => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log(order);
		try {
			const response = await axios.post('/api/v1/order/new', order, config);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);

const newOrderSlice = createSlice({
	name: 'newOrder',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(createOrder.pending, (state, action) => {
			state.loading = true;
			state.order = {};
			state.error = null;
		});
		builder.addCase(createOrder.fulfilled, (state, action) => {
			state.loading = false;
			state.order = action.payload;
			state.error = null;
		});
		builder.addCase(createOrder.rejected, (state, action) => {
			state.loading = false;
			state.order = {};
			console.log(action.error);
			state.error = action.error.message;
		});
	},
});

export const { clearErrors } = newOrderSlice.actions;
export default newOrderSlice.reducer;
