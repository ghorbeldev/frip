import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, clearErrors } from '../../../redux/features/user/authSlice';
import {
	updateProfile,
	updateProfileReset,
} from '../../../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import MetaData from '../MetaData';
import './update-profile.scss';
const UpdateProfile = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	const alert = useAlert();
	const dispatch = useDispatch();

	const { user } = useSelector(state => state.auth);
	const { error, isUpdated, loading } = useSelector(state => state.user);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('User updated successfully');
			dispatch(loadUser());

			navigate('/me');

			dispatch(updateProfileReset());
		}
	}, [dispatch, alert, error, navigate, isUpdated]);

	const submitHandler = e => {
		e.preventDefault();

		dispatch(updateProfile({ name, email }));
	};

	return (
		<Fragment>
			<MetaData title={'Update Profile'} />

			<div className='row wrapper' id='update-profile'>
				<div className='col-10 col-lg-5'>
					<form
						className='shadow-lg'
						onSubmit={submitHandler}
						encType='multipart/form-data'
					>
						<h1 className='mt-2 mb-5'>Update Profile</h1>

						<div className='form-group'>
							<label htmlFor='email_field'>Name</label>
							<input
								type='name'
								id='name_field'
								className='form-control'
								name='name'
								value={name}
								onChange={e => setName(e.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='email_field'>Email</label>
							<input
								type='email'
								id='email_field'
								className='form-control'
								name='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</div>

						<button
							type='submit'
							className='btn update-btn btn-block mt-4 mb-3'
							disabled={loading ? true : false}
						>
							Update
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateProfile;
