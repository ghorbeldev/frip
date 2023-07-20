import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	message: null,
	success: null,
	error: null,
};

export const forgotPasswordFetch = createAsyncThunk(
	'forgotPassword/forgotPasswordFetch',
	async email => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.post(
				'/api/v1/password/update',
				email,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const resetPassword = createAsyncThunk(
	'forgotPassword/resetPassword',
	async user => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.put(
				`/api/v1/password/reset/${user.token}`,
				user.passwords,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(forgotPasswordFetch.pending, (state, action) => {
			state.loading = true;
			state.message = '';
			state.error = null;
		});
		builder.addCase(forgotPasswordFetch.fulfilled, (state, action) => {
			state.loading = false;
			state.message = action.payload.message;
			state.error = null;
		});
		builder.addCase(forgotPasswordFetch.rejected, (state, action) => {
			state.loading = false;
			state.message = '';
			state.error = action.error.message;
		});

		builder.addCase(resetPassword.pending, (state, action) => {
			state.loading = true;
			state.message = null;
			state.success = null;
			state.error = null;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.loading = false;
			state.success = action.payload.success;
			state.message = null;
			state.error = null;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.loading = false;
			state.message = null;
			state.success = false;
			state.error = action.error.message;
		});
	},
});

export const { clearErrors } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
