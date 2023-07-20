import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../loader/Loader';
import MetaData from '../MetaData';
import './profile.scss';
const Profile = () => {
	const { user, loading } = useSelector(state => state.auth);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={'Your Profile'} />
					<div id='profile'>
						<h2 className='mt-5 ml-5'>My Profile</h2>
						<div className='row justify-content-around user-info'>
							<div className='data'>
								<h4>Full Name</h4>
								<p>{user.name}</p>

								<h4>Email Address</h4>
								<p>{user.email}</p>

								<h4>Joined On</h4>
								<p>{String(user.createdAt).substring(0, 10)}</p>

								{user.role !== 'admin' && (
									<Link to='/orders/me' className='btn btn-danger btn-block'>
										My Orders
									</Link>
								)}

								<Link
									to='/password/update'
									className='btn btn-primary btn-block'
								>
									Change Password
								</Link>
								<Link
									to='/me/update'
									id='edit_profile'
									className='btn btn-primary btn-block'
								>
									Edit Profile
								</Link>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
