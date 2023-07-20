import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	isAuthenticated: false,
	user: {},
	error: null,
};
export const authUser = createAsyncThunk('auth/authUser', async user => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await axios.post('/api/v1/login', user, config);
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async user => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.post('/api/v1/register', user, config);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const loadUser = createAsyncThunk('auth/loadUser', async () => {
	try {
		const response = await axios.get('/api/v1/me');
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});
export const logout = createAsyncThunk('auth/logout', async () => {
	try {
		await axios.get('/api/v1/logout');
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(authUser.pending, state => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = {};
			state.error = null;
		});
		builder.addCase(authUser.fulfilled, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.error = null;
		});
		builder.addCase(authUser.rejected, (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = {};
			state.error = action.error.message || 'Internal Server Error';
		});
		builder.addCase(loadUser.pending, state => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = {};
			state.error = null;
		});
		builder.addCase(loadUser.fulfilled, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.error = null;
		});
		builder.addCase(loadUser.rejected, (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = {};
			state.error = action.error.message || 'Internal Server Error';
		});
		builder.addCase(registerUser.pending, state => {
			state.loading = true;
			state.isAuthenticated = false;
			state.user = {};
			state.error = null;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false;
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.error = null;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = {};
			state.error = action.error.message || 'Internal Server Error';
		});

		builder.addCase(logout.fulfilled, (state, action) => {
			state.loading = false;
			state.isAuthenticated = false;
			state.user = {};
			state.error = null;
		});

		builder.addCase(logout.rejected, (state, action) => {
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;
