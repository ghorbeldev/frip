import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import {
	FaClipboard,
	FaPlus,
	FaProductHunt,
	FaShoppingBasket,
	FaStar,
	FaTachometerAlt,
	FaUsers,
} from 'react-icons/fa';
import Collapse from 'react-bootstrap/Collapse';
const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className='sidebar-wrapper'>
			<nav id='sidebar'>
				<ul className='list-unstyled components'>
					<li>
						<Link to='/dashboard'>
							<FaTachometerAlt /> Dashboard
						</Link>
					</li>

					<li>
						<a
							href='#productSubmenu'
							data-toggle='collapse'
							className='dropdown-toggle'
							onClick={() => setOpen(prev => !prev)}
						>
							<FaProductHunt /> Products
						</a>
						<Collapse in={open}>
							<ul className='collapse list-unstyled'>
								<li>
									<Link to='/admin/products'>
										<FaClipboard /> All
									</Link>
								</li>

								<li>
									<Link to='/admin/product'>
										<FaPlus /> Create
									</Link>
								</li>
							</ul>
						</Collapse>
					</li>

					<li>
						<Link to='/admin/orders'>
							<FaShoppingBasket /> Orders
						</Link>
					</li>

					<li>
						<Link to='/admin/users'>
							<FaUsers /> Users
						</Link>
					</li>

					<li>
						<Link to='/admin/reviews'>
							<FaStar /> Reviews
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
