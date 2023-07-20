import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	users: [],
	error: null,
};

export const allUsers = createAsyncThunk('allUsers/allUsers', async () => {
	try {
		const response = await axios.get('/api/v1/admin/users');
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});

const allUsersSLice = createSlice({
	name: 'allUsers',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(allUsers.pending, (state, action) => {
			state.loading = true;
			state.users = [];
			state.error = null;
		});
		builder.addCase(allUsers.fulfilled, (state, action) => {
			state.loading = false;
			state.users = action.payload.users;

			state.error = null;
		});
		builder.addCase(allUsers.rejected, (state, action) => {
			state.loading = false;
			state.users = [];
			console.log(action.error);
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors } = allUsersSLice.actions;
export default allUsersSLice.reducer;
