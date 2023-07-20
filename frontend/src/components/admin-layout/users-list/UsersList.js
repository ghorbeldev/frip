import React, { Fragment, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	allUsers,
	clearErrors,
} from '../../../redux/features/allUsers/allUsersSlice';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import MetaData from '../../layout/MetaData';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../../loader/Loader';
import {
	deleteUser,
	deleteUserReset,
	clearErrors as clearUserErrors,
} from '../../../redux/features/user/userSlice';
import CustomTable from '../../CustomTable/CustomTable';

const UsersList = () => {
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, users } = useSelector(state => state.allUsers);
	const { isDeleted, error: deleteError } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(allUsers());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		if (deleteError) {
			alert.error(deleteError);
			dispatch(clearUserErrors());
		}

		if (isDeleted) {
			alert.success('User deleted successfully');
			navigate('/admin/users');
			dispatch(deleteUserReset);
		}
	}, [dispatch, alert, error, isDeleted, deleteError, navigate]);

	const deleteUserHandler = id => {
		dispatch(deleteUser(id));
	};

	const setUsers = () => {
		const data = {
			columns: [
				{
					label: 'User ID',
					field: 'id',
					sort: 'asc',
				},
				{
					label: 'Name',
					field: 'name',
					sort: 'asc',
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
				},
				{
					label: 'Role',
					field: 'role',
					sort: 'asc',
				},
				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		users.forEach(user => {
			data.rows.push({
				id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,

				actions: (
					<Fragment>
						<Link
							to={`/admin/user/${user._id}`}
							className='btn btn-primary py-1 px-2'
						>
							<FaPencilAlt />
						</Link>
						<button
							className='btn btn-danger py-1 px-2 ml-2'
							onClick={() => deleteUserHandler(user._id)}
						>
							<FaTrash />
						</button>
					</Fragment>
				),
			});
		});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'All Users'} />
			<div className='row'>
				<div className='col-12 col-md-2'>
					<Sidebar />
				</div>

				<div className='col-12 col-md-10 mt-header-lg'>
					<div className='container'>
						<h1 className='my-5'>All Users</h1>

						{loading ? <Loader /> : <CustomTable data={setUsers()} />}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UsersList;
