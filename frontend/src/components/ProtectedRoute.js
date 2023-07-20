import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
	const { isAuthenticated, loading, user } = useSelector(state => state.auth);

	if (isAdmin && user.role !== 'admin') {
		return <Navigate tp='/' replace={true} />;
	}

	return !loading && isAuthenticated ? (
		<Component {...rest} />
	) : (
		<Navigate to='/login' replace={true} />
	);
};

export default ProtectedRoute;
