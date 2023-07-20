import React from 'react';
import './footer.scss';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
const Footer = () => {
	return (
		<footer id='footer'>
			<p>
				©FRIP 2023 <br />
				All Rights Reserved
			</p>
			<ul className='social-media'>
				<li>
					<a href='https://www.facebook.com/profile.php?id=100094676712492'>
						<FaFacebook />
					</a>
				</li>
				<li>
					<a href='https://www.instagram.com/fripo_nline/'>
						<FaInstagram />
					</a>
				</li>
				<li>
					<a href='https://www.tiktok.com/@frip.online'>
						<FaTiktok />
					</a>
				</li>
			</ul>
		</footer>
	);
};

export default Footer;
