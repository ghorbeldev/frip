import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	user: {},
	error: null,
};

export const getUserDetails = createAsyncThunk(
	'user/getUserDetails',
	async id => {
		try {
			const response = await axios.get(`/api/v1/admin/user/${id}`);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(getUserDetails.pending, (state, action) => {
			state.loading = true;
			state.user = {};
			state.error = null;
		});

		builder.addCase(getUserDetails.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.user = action.payload.user;
			state.error = null;
		});

		builder.addCase(getUserDetails.rejected, (state, action) => {
			state.loading = false;
			state.user = {};
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
