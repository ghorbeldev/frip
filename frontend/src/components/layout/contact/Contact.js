import React from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { MdOutlineMail } from 'react-icons/md';

import './contact.scss';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
const Contact = () => {
	return (
		<div id='contact' className='contact'>
			<div className='container'>
				<h1 className='heading'>Contact Me</h1>
				<div className='contact__content'>
					<form
						action='https://formsubmit.co/friptunisie@gmail.com'
						method='POST'
					>
						<input
							className='main-input'
							type='text'
							name='name'
							placeholder='Your Name'
							required
						/>
						<input
							className='main-input'
							type='email'
							name='email'
							placeholder='Your Email'
							required
						/>
						<textarea
							className='main-input'
							name='message'
							placeholder='Your Message'
						></textarea>
						<input type='submit' value='Send Message' />
					</form>
					<div className='info'>
						<h4>Want To Discuss</h4>

						<a
							className='info__contact'
							href='https://www.instagram.com/fripo_nline/'
						>
							<FaInstagram />
							<span>Instagram</span>
						</a>
						<a
							className='info__contact'
							href='https://www.facebook.com/profile.php?id=100094676712492'
						>
							<FaFacebook />
							<span>Facebook</span>
						</a>
						<a
							className='info__contact'
							href='https://www.tiktok.com/@frip.online'
						>
							<FaTiktok />
							<span>TikTok</span>
						</a>
						<a className='info__contact' href='mailto:friptunisie@gmail.com'>
							<MdOutlineMail />
							<span>Mail</span>
						</a>
						<h4 className='info__thanks'>THANKS FOR YOUR VISIT!</h4>
						<p>
							Send Me a Message <span className='text-primary'>Now</span> and
							Let's Start Talking
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
