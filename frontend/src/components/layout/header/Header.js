import React, { useEffect, useState } from 'react';
import './header.scss';
import { BiSearch } from 'react-icons/bi';
import { FiShoppingCart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { logout } from '../../../redux/features/user/authSlice';
const Header = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [keyword, setKeyword] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const alert = useAlert();
	const { user, loading, isAuthenticated } = useSelector(state => state.auth);
	const { cartItems } = useSelector(state => state.cart);
	const logoutHandler = () => {
		dispatch(logout());
		alert.success('Logged Out Successfully');
	};
	const searchHandler = e => {
		e.preventDefault();

		if (keyword.trim()) {
			navigate(`/shop?keyword=${keyword.trim()}`);
		}
	};
	const toggleSidebar = () => {
		setSidebarOpen(prevState => !prevState);
	};
	const [isScrollToDown, setIsScrollToDown] = useState();
	useEffect(() => {
		const handleScroll = () => {
			if (
				document.body.scrollTop > 112 ||
				document.documentElement.scrollTop > 112
			) {
				setIsScrollToDown(true);
			} else {
				setIsScrollToDown(false);
			}
		};
		document.body.addEventListener('scroll', handleScroll);
		return () => document.body.removeEventListener('scroll', handleScroll);
	}, []);
	return (
		<>
			<nav id='header' className={isScrollToDown ? 'shrink' : ''}>
				{/* Logo */}
				<Link to='/'>
					<div className='logo'>
						<img src='/images/logo_1.png' alt='Frip' />
					</div>
				</Link>
				<div
					className={`toggle-menu${sidebarOpen ? ' close' : ''}`}
					onClick={toggleSidebar}
				>
					<span className='bar'></span>
					<span className='bar'></span>
					<span className='bar'></span>
				</div>
				<div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
					{/* Search Bar */}
					<form className='search' onSubmit={searchHandler}>
						<input
							type='text'
							placeholder='Enter Product Name'
							value={keyword}
							onChange={e => setKeyword(e.target.value)}
						/>
						<button>
							<BiSearch />
						</button>
					</form>

					{/* Cart adn Login */}
					<div className='info'>
						<ul className='nav'>
							<li className='underline'>
								<Link to={'/'}>Home</Link>
							</li>
							<li className='underline'>
								<Link to={'/shop'}>Shop</Link>
							</li>
							<li className='underline'>
								<Link to={'/contact'}>Contact</Link>
							</li>
						</ul>
						<div className='user'>
							<div className='user__login'>
								{isAuthenticated ? (
									<Dropdown>
										<Dropdown.Toggle as={Link} to={'#!'} className='btn'>
											<span>{user && user.name}</span>
										</Dropdown.Toggle>
										<Dropdown.Menu>
											{user && user.role === 'admin' && (
												<Dropdown.Item as={Link} to='/dashboard'>
													Dashboard
												</Dropdown.Item>
											)}
											<Dropdown.Item as={Link} to='/orders/me'>
												Orders
											</Dropdown.Item>
											<Dropdown.Item as={Link} to='/me'>
												Profile
											</Dropdown.Item>
											<Dropdown.Item
												onClick={logoutHandler}
												className='text-danger'
												as={Link}
												to='/'
											>
												Logout
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								) : (
									!loading && (
										<button>
											<Link to='/login'>Login</Link>
										</button>
									)
								)}
							</div>
							<div className='user__cart'>
								<Link to='/cart'>
									<button>
										<FiShoppingCart />
									</button>
									{cartItems.length !== 0 ? (
										<div className='total_items'>{cartItems.length}</div>
									) : null}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
