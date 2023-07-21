const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter product name'],
		trim: true,
		maxLength: [100, 'prroduct name cannot exceed 100 characters'],
	},
	price: {
		type: Number,
		required: [true, 'Please enter product price'],
		maxLength: [5, 'prroduct price cannot exceed 100 characters'],
		default: 0.0,
	},
	size: {
		type: String,
		required: [true, 'Please Select Item Size'],
		enum: {
			values: ['s', 'm', 'l', 'xl', 'xxl'],
			message: 'Please select correct size for product',
		},
	},
	description: {
		type: String,
		required: [true, 'Please enter product description'],
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	category: {
		type: String,
		required: [true, 'Please select product category'],
		enum: {
			values: ['men', 'women', 'kids'],
			message: 'Please select correct category for product',
		},
	},
	seller: {
		type: String,
		required: [true, 'Please enter product seller'],
	},
	stock: {
		type: Number,
		required: [true, 'Please enter product stock'],
		maxLength: [5, 'Product stock cannot be above 5 numbers'],
		default: 0,
	},
	// user: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: 'User',
	// 	required: true,
	// },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Product', productSchema);
