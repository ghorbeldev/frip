const express = require('express');

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {
	getProducts,
	newProduct,
	getSingleProduct,
	updateProduct,
	deleteProduct,
	getAdminProducts,
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router
	.route('/admin/products')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
router.route('/product/:id').get(getSingleProduct);

router
	.route('/admin/product/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router
	.route('/admin/product/new')
	.post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);
module.exports = router;
