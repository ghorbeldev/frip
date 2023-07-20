const User = require('../models/user');
const ErrorHandler = require('../utils/errorHnadler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtTokens');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
// Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password } = req.body;
	const user = await User.create({
		name,
		email,
		password,
	});
	const token = user.getJwtToken();
	sendToken(user, 200, res);
	res.status(201).json({
		success: true,
		token,
	});
});

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	// check if emails entered by user
	if (!email || !password)
		return next(ErrorHandler('Please enter email and password', 400));
	// finding user in database
	const user = await User.findOne({ email }).select('+password');
	if (!user) return next(new ErrorHandler('Invalid Email or Password', 401));
	// checks is password corrcect or not
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched)
		return next(new ErrorHandler('Invalid Email or Password', 401));
	sendToken(user, 200, res);
});

// get current login user details
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// update/change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');
	// check previous user password
	const isMatched = await user.comparePassword(req.body.oldPassword);
	if (!isMatched)
		return next(new ErrorHandler('Old password is incorrect', 400));
	user.password = req.body.password;
	await user.save();
	sendToken(user, 200, res);

	res.status(200).json({
		success: true,
		user,
	});
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
	};
	// Update Avatar: Todo
	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
	});
});
// logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});
	res.status(200).json({
		success: true,
		message: 'Logged Out',
	});
});

// forgot password => /api/v1/password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return next(new ErrorHandler('User not found with this email', 404));
	// get reset token
	const resetToken = user.getResetPasswordToken();
	await user.save({ validateBeforeSave: false });
	// create reset password url
	const resetUrl = `${req.protocol}://${req.get(
		'host'
	)}/password/reset/${resetToken}`;
	const message = `Your password reset tokenis as follow: \n\n${resetUrl}`;
	try {
		await sendEmail({
			email: user.email,
			subject: 'Frip password recovery',
			message,
		});
		res.status(200).json({
			success: true,
			message: `Email send to ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save({
			validateBeforeSave: false,
		});
		return next(new ErrorHandler(error.message, 500));
	}
});

// reset password => /api/v2/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	// Hash url token
	const resetPasswordToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: {
			$gt: Date.now(),
		},
	});
	if (!user)
		return next(
			new ErrorHandler(
				'password reset token is invalid or as been expired',
				400
			)
		);
	if (req.body.password !== req.body.confirmPassword)
		return next(new ErrorHandler('Password not math', 400));
	user.password = req.body.password;
	user.resetPasswordToken = null;
	user.resetPasswordExpire = null;
	await user.save();
	sendToken(user, 200, res);
});

// Admin Routes
// Get all users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		success: true,
		users,
	});
});

// Get Specific user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user)
		return next(
			new ErrorHandler(`user does not found with id: ${req.params.id} `, 400)
		);

	res.status(200).json({
		success: true,
		user,
	});
});
// update user profile by admin
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
	if (!(await User.findById(req.params.id)))
		return next(
			new ErrorHandler(`User does not found with id ${req.params.id}`, 400)
		);

	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role,
	};

	const user = await User.findOneAndUpdate(
		{ _id: req.params.id, role: 'user' },
		newUserData,
		{
			new: true,
			runValidators: true,
			useFindAndModify: false,
		}
	);

	if (!user)
		return next(
			new ErrorHandler(`You can't edit data for users with admin roles`, 400)
		);

	res.status(200).json({
		success: true,
	});
});

// delete user by admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	if (!(await User.findById(req.params.id)))
		return next(
			new ErrorHandler(`User does not found with id ${req.params.id}`, 400)
		);

	const user = await User.findOne({
		_id: req.params.id,
		role: 'user',
	});

	if (!user)
		return next(
			new ErrorHandler(`You can't delete users with admin roles`, 400)
		);

	// remove avatar from cloudinary server

	await user.deleteOne();

	res.status(200).json({
		success: true,
	});
});
