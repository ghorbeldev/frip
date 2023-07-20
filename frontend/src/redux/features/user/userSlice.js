import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	loading: false,
	isUpdated: false,
	isDeleted: false,
	error: null,
};

export const updateProfile = createAsyncThunk(
	'user/updateProfile',
	async user => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.put('/api/v1/me/update', user, config);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const updatePassword = createAsyncThunk(
	'user/updatePassword',
	async passwords => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const response = await axios.put(
				'/api/v1/password/update',
				passwords,
				config
			);
			return response.data;
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
// update user by admin
export const updateUser = createAsyncThunk('user/updateUser', async user => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	for (var pair of user.data.entries()) {
		console.log(pair[0] + ', ' + pair[1]);
	}
	try {
		const response = await axios.put(
			`/api/v1/admin/user/${user.id}`,
			user.data,
			config
		);
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});
// delete user by admin
export const deleteUser = createAsyncThunk('user/deleteUser', async id => {
	try {
		const response = await axios.delete(`/api/v1/admin/user/${id}`);
		return response.data;
	} catch (err) {
		throw new Error(err.response.data.message);
	}
});
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		updateProfileReset: state => {
			state.loading = false;
			state.isUpdated = false;
			state.error = null;
		},
		updatePasswordReset: state => {
			state.loading = false;
			state.error = null;
			state.isUpdated = false;
		},
		updateUserReset: state => {
			state.loading = false;
			state.error = null;
			state.isUpdated = false;
		},
		deleteUserReset: state => {
			state.loading = false;
			state.error = null;
			state.isUpdated = false;
			state.isDeleted = false;
		},
	},
	extraReducers: builder => {
		builder.addCase(updateProfile.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.error = null;
		});

		builder.addCase(updateProfile.fulfilled, (state, action) => {
			state.loading = false;
			state.isUpdated = action.payload.success;
			state.error = null;
		});

		builder.addCase(updateProfile.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.error = action.error.message;
		});

		builder.addCase(updatePassword.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.error = null;
		});

		builder.addCase(updatePassword.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.isUpdated = action.payload.success;
			state.error = null;
		});

		builder.addCase(updatePassword.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.error = action.error.message;
		});
		builder.addCase(updateUser.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.error = null;
		});

		builder.addCase(updateUser.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.isUpdated = action.payload.success;
			state.error = null;
		});

		builder.addCase(updateUser.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.error = action.error.message;
		});
		builder.addCase(deleteUser.pending, (state, action) => {
			state.loading = true;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = null;
		});

		builder.addCase(deleteUser.fulfilled, (state, action) => {
			console.log(action);
			state.loading = false;
			state.isUpdated = false;
			state.isDeleted = action.payload.success;
			state.error = null;
		});

		builder.addCase(deleteUser.rejected, (state, action) => {
			state.loading = false;
			state.isUpdated = false;
			state.isDeleted = false;
			state.error = action.error.message;
		});
	},
});

export const {
	clearErrors,
	updateProfileReset,
	updatePasswordReset,
	updateUserReset,
	deleteUserReset,
} = userSlice.actions;
export default userSlice.reducer;
