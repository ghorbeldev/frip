import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cartItems: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: [],
	shippingInfo: localStorage.getItem('shippingInfo')
		? JSON.parse(localStorage.getItem('shippingInfo'))
		: {},
};

export const addItemToCart = createAsyncThunk(
	'cart/addItemToCart',
	async item => {
		try {
			const { data } = await axios.get(`/api/v1/product/${item.id}`);

			return {
				product: data.product._id,
				name: data.product.name,
				price: data.product.price,
				image: data.product.images[0].url,
				stock: data.product.stock,
				quantity: item.quantity,
			};
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	}
);
export const updateCartItems = createAsyncThunk(
	'cart/updateCartItems',
	async _ => {
		const updatedCartItemsData = localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [];
		if (updatedCartItemsData.length !== 0) {
			const result = await Promise.all(
				updatedCartItemsData.map(async (item, index) => {
					try {
						const { data } = await axios.get(`/api/v1/product/${item.product}`);
						return {
							...item,
							product: data.product._id,
							name: data.product.name,
							price: data.product.price,
							image: data.product.images[0].url,
							stock: data.product.stock,
						};
					} catch (err) {
						console.log(err);
						return item;
					}
				})
			);
			console.log(result);
			return result;
		} else {
			return updatedCartItemsData;
		}
	}
);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		clearErrors: state => {
			state.error = null;
		},
		removeItemFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter(
				i => i.product !== action.payload
			);
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		resetCart: state => {
			state.cartItems = initialState.cartItems;
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		},
		saveShippingInfo: (state, action) => {
			state.shippingInfo = action.payload;
			localStorage.setItem('shippingInfo', JSON.stringify(state.shippingInfo));
		},
	},
	extraReducers: builder => {
		builder.addCase(addItemToCart.fulfilled, (state, action) => {
			const item = action.payload;
			const isItemExist = state.cartItems.find(i => i.product === item.product);

			if (isItemExist) {
				state.cartItems = state.cartItems.map(i =>
					i.product === isItemExist.product ? item : i
				);
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		});
		builder.addCase(updateCartItems.fulfilled, (state, action) => {
			state.cartItems = action.payload;
			localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
		});
		builder.addCase(addItemToCart.rejected, (state, action) => {
			state.error = action.error.message || 'Internal Server Error';
		});
	},
});

export const { clearErrors, removeItemFromCart, saveShippingInfo, resetCart } =
	cartSlice.actions;
export default cartSlice.reducer;
