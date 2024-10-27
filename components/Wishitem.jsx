import React from 'react'
import { useDispatch } from 'react-redux'
import { removeWishItem } from '../store/slices/wishListSlice'

export default function Wishitem({ productId, title, rating, price, imageUrl, quantity }) {
  const dispatch = useDispatch()




  const handleRemove = () => {
    const username = localStorage.getItem('username');
    
    // Retrieve the correct wishlist from local storage
    const key = username ? `${username}wish` : 'wishItems';
    const storedWishList = JSON.parse(localStorage.getItem(key)) || [];
    
    // Filter out the item to be removed
    const updatedWishList = storedWishList.filter(item =>item.productId !== productId// Corrected: Return the comparison result
    );
    
    // Update local storage with the new wishlist
    localStorage.setItem(key, JSON.stringify(updatedWishList));
    
    // Dispatch the action to remove the item from Redux
    dispatch(removeWishItem({ productId }));
  };
  


  return (
    <div className="cart-item-container" key={productId}>
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
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
