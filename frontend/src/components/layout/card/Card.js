import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../../redux/features/cart/cartSlice';
import { useAlert } from 'react-alert';

// Render the image in a React component.
const Card = ({ productName, img, price, size = 'sm', id, stock }) => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const addToCart = () => {
		dispatch(addItemToCart({ id, quantity: 1 }));
		alert.success('Item Added Successfully');
	};
	return (
		<div className='card' key={id}>
			<Link to={`/product/${id}`} style={{ textDecoration: 'none' }}>
				<div className='card__img'>
					<img src={img.url} alt={productName} />
				</div>
			</Link>
			<h4 className='card__title'>{productName}</h4>
			<div className='card__details'>
				<span className='price'>{price}TD</span>
				{size && <span className='size'>({size})</span>}
			</div>
			<button
				className='card__add slide'
				onClick={addToCart}
				disabled={stock <= 0}
			>
				Add To Cart
			</button>
		</div>
	);
};

export default Card;
