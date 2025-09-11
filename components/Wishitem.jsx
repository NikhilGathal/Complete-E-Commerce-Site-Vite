import React from 'react'
import { useDispatch } from 'react-redux'
import { removeWishItem } from '../store/slices/wishListSlice'
import { Link } from 'react-router-dom';

export default function Wishitem({ productId, title, rating, price, imageUrl, quantity }) {
  const dispatch = useDispatch()
  const handleRemove = () => {
    const username = localStorage.getItem('username');
    const key = username ? `${username}wish` : 'wishItems';
    const storedWishList = JSON.parse(localStorage.getItem(key)) || [];
    const updatedWishList = storedWishList.filter(item =>item.productId !== productId);
    localStorage.setItem(key, JSON.stringify(updatedWishList));
    dispatch(removeWishItem({ productId }));
  };
  


  return (
    <div className="cart-item-container" key={productId}>
      <div className="cart-item">
      <Link to={`/product/${productId}`}> <img src={imageUrl} alt={title} />  </Link>  
        <div>
        <Link to={`/product/${productId}`}>  <h3>{title}</h3> </Link>  
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>

      <div className="">${price}</div>

      <div className="item-quantity">
        {/* <button onClick={() => dispatch(decreaseCartItemQuantity(productId))}></button> */}
        {/* <span>{quantity}</span> */}
        <button onClick={handleRemove}>Remove</button>
      </div>
      <div className="item-total"></div>
    </div>
  )
}
