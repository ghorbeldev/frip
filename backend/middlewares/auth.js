const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHnadler');
const catchAsyncErrors = require('./catchAsyncErrors');
const User = require('../models/user');

// check if user authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
	const { token } = req.cookies;
	if (!token)
		return next(new ErrorHandler('Login first to access this resource', 401));
	const decode = jwt.verify(token, process.env.JWT_SECRET);
	req.user = await User.findById(decode.id);
	next();
});
exports.authorizeRoles =
	(...roles) =>
	(req, res, next) => {
		if (!roles.includes(req.user.role))
			next(
				new ErrorHandler(
					`Role ${req.user.role} is not allowed to access this resource `,
					403
				)
			);
		next();
	};
