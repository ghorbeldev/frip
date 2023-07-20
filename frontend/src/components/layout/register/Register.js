import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../MetaData';
import './register.scss';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	clearErrors,
	registerUser,
} from '../../../redux/features/user/authSlice';

const Register = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = user;

	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, error, loading } = useSelector(state => state.auth);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, isAuthenticated, error, navigate]);

	const submitHandler = e => {
		e.preventDefault();

		dispatch(registerUser({ ...user }));
	};

	const onChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<Fragment>
			<MetaData title={'Register User'} />

			<div className='row wrapper' id='register'>
				<div className='col-10 col-lg-5'>
					<form
						className='shadow-lg'
						onSubmit={submitHandler}
						encType='multipart/form-data'
					>
						<h1 className='mb-3'>Register</h1>

						<div className='form-group'>
							<label htmlFor='email_field'>Name</label>
							<input
								type='name'
								id='name_field'
								className='form-control'
								name='name'
								value={name}
								onChange={onChange}
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
								onChange={onChange}
							/>
						</div>

						<div className='form-group'>
							<label htmlFor='password_field'>Password</label>
							<input
								type='password'
								id='password_field'
								className='form-control'
								name='password'
								value={password}
								onChange={onChange}
							/>
						</div>

						<button
							id='register_button'
							type='submit'
							className='btn btn-block py-3'
							disabled={loading ? true : false}
						>
							REGISTER
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
