const Order = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHnadler');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const order = require('../models/order');

// create a new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
	const { orderItems, shippingInfo, itemsPrice, shippingPrice, totalPrice } =
		req.body;
	const order = await Order.create({
		orderItems,
		shippingInfo,
		itemsPrice,
		shippingPrice,
		totalPrice,
		user: req.user._id,
	});

	order.orderItems.forEach(async item => {
		await updateStock(item.product, item.quantity);
	});

	res.status(200).json({
		success: true,
		order,
	});
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	);
	if (!order) return next(new ErrorHandler('No Order found with this ID', 400));
	res.status(200).json({
		success: true,
		order,
	});
});
// Get logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find({ user: req.user.id });

	res.status(200).json({
		success: true,
		orders,
	});
});

// Admin: Get All Orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
	const orders = await Order.find();

	let totalAmount = 0;
	orders.forEach(order => {
		totalAmount += order.totalPrice;
	});

	res.status(200).json({
		success: true,
		totalAmount,
		orders,
	});
});

// Admin: Get All Orders
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (order.orderStatus === 'Delivered')
		return next(new ErrorHandler('You Have Already Delivered This Order', 400));

	order.orderStatus = req.body.status;
	order.deliveredAt = Date.now();

	await order.save();
	res.status(200).json({
		success: true,
		order,
	});
});
async function updateStock(id, quantity) {
	const product = await Product.findById(id);
	product.stock = product.stock - quantity;
	await product.save({ validateBeforeSave: false });
}

// Admin: Delet Order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if (!order)
		return next(
			new ErrorHandler(`Order with ID ${req.params.id} Does Not Exist!`, 404)
		);

	await order.deleteOne();
	res.status(200).json({
		success: true,
	});
});
