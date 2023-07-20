import React, { Fragment, useState, useEffect } from 'react';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
	clearErrors,
	resetPassword,
} from '../../../redux/features/user/forgotPasswordSlice';
import MetaData from '../MetaData';

const NewPassword = () => {
	const navigate = useNavigate();
	const params = useParams();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, success } = useSelector(state => state.forgotPassword);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success('Password updated successfully');
			navigate('/login');
		}
	}, [dispatch, alert, error, success, navigate]);

	const submitHandler = e => {
		e.preventDefault();

		dispatch(
			resetPassword({
				token: params.token,
				password: { password, confirmPassword },
			})
		);
	};

	return (
		<Fragment>
			<MetaData title={'New Password Reset'} />

			<div className='row wrapper'>
				<div className='col-10 col-lg-5'>
					<form className='shadow-lg' onSubmit={submitHandler}>
						<h1 className='mb-3'>New Password</h1>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								className='form-control'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='confirm_password_field'>Confirm Password</label>
							<input
								type='password'
								id='confirm_password_field'
								className='form-control'
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
						</div>

						<button
							id='new_password_button'
							type='submit'
							className='btn btn-block py-3'
						>
							Set Password
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default NewPassword;
