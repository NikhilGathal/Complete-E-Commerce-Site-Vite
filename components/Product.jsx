import { useDispatch } from 'react-redux'
import { addCartItem } from '../store/slices/cartSlice'
import { addWishItem } from '../store/slices/wishListSlice'
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
export default function Product({ productId, title, rating, price, imageUrl }) {








  const dispatch = useDispatch()
  return (
    <div className="product">
      <div className="product-image">
        <Link to={`/${productId}`}> <img src={imageUrl} alt={title} />  </Link>
      </div>
      <div className="title-container">
        <Link to={`/${productId}`}>  <h3 className='item-detail'>
          {title}
        </h3> </Link>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button
          onClick={() => {
            const username = localStorage.getItem('username');
            const cartKey = username ? `${username}cart` : 'cartItems';
            let storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
            const existingProductIndex = storedCart.findIndex(item => item.productId === productId);
            if (existingProductIndex !== -1) {
              // Increase quantity
              storedCart[existingProductIndex].quantity += 1;
            } else {
              // If it doesn't exist, add a new object with productId and quantity
              storedCart.push({ productId, quantity: 1 });
            }
            // Save the updated cart back to localStorage
            localStorage.setItem(cartKey, JSON.stringify(storedCart));
            // Dispatch the action to add to cart in Redux
            dispatch(addCartItem({ productId }));
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => {

          
              const username = localStorage.getItem('username');
              const wishKey = username ? `${username}wish` : 'wishItems';
              let storedWish = JSON.parse(localStorage.getItem(wishKey)) || [];
              const existingProductIndex = storedWish.findIndex(item => item.productId === productId);
              if (existingProductIndex !== -1) {
                console.log("Product already in wishlist.");
              } else {
                storedWish.push({ productId, quantity: 1 });
              }
              // Save the updated wishlist back to localStorage
              localStorage.setItem(wishKey, JSON.stringify(storedWish));

              // Dispatch the action to add to the wishlist in Redux
              dispatch(addWishItem({ productId }));
             



          }}
        >Add to WishList</button>
      </div>
    </div>
  )
}
