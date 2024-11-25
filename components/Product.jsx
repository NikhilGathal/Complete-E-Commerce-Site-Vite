// import { useDispatch } from 'react-redux'
// import { addCartItem } from '../store/slices/cartSlice'
// import { addWishItem } from '../store/slices/wishListSlice'
// import { Link } from 'react-router-dom'
// import { useOutletContext } from 'react-router-dom'
// import { useEffect } from 'react'
// import { deleteProduct } from '../store/slices/productsSlice'
// export default function Product({ productId, title, rating, price, imageUrl }) {


//   const username = localStorage.getItem('username');
//   const isAdmin = username === 'Admin';
//   const dispatch = useDispatch()
//   return (
//     <div className="product">
//       <div className="product-image">
//         <Link to={`/${productId}`}> <img src={imageUrl} alt={title} />  </Link>
//       </div>
//       <div className="title-container">
//         <Link to={`/${productId}`}>  <h3 className='item-detail'>
//           {title}
//         </h3> </Link>
//       </div>
//       <div className="price-rating-container">
//         <p className="rating">{+rating} ★ ★ ★ ★</p>
//         <p className="price">${price}</p>
//       </div>
//       <div className="cta-container">
//         <button
//           onClick={() => {

//             if(isAdmin)
//             {
//               dispatch(deleteProduct(productId)); 
//             }
//             else
//             {
//               const username = localStorage.getItem('username');
//               const cartKey = username ? `${username}cart` : 'cartItems';
//               let storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
//               const existingProductIndex = storedCart.findIndex(item => item.productId === productId);
//               if (existingProductIndex !== -1) {
//                 // Increase quantity
//                 storedCart[existingProductIndex].quantity += 1;
//               } else {
//                 // If it doesn't exist, add a new object with productId and quantity
//                 storedCart.push({ productId, quantity: 1 });
//               }
//               // Save the updated cart back to localStorage
//               localStorage.setItem(cartKey, JSON.stringify(storedCart));
//               // Dispatch the action to add to cart in Redux
//               dispatch(addCartItem({ productId }));
//             }
           
//           }}
//         >
//           {isAdmin ? 'Remove Item' : 'Add to Cart'}
//         </button>
//         <button
//           onClick={() => {

//             if(isAdmin)
//             {

//             }
//             else
//             {
//               const username = localStorage.getItem('username');
//               const wishKey = username ? `${username}wish` : 'wishItems';
//               let storedWish = JSON.parse(localStorage.getItem(wishKey)) || [];
//               const existingProductIndex = storedWish.findIndex(item => item.productId === productId);
//               if (existingProductIndex !== -1) {
//                 console.log("Product already in wishlist.");
//               } else {
//                 storedWish.push({ productId, quantity: 1 });
//               }
//               // Save the updated wishlist back to localStorage
//               localStorage.setItem(wishKey, JSON.stringify(storedWish));

//               // Dispatch the action to add to the wishlist in Redux
//               dispatch(addWishItem({ productId }));
//             }

          
            
             



//           }}
//         >{isAdmin ? 'Update Item' : 'Add to WishList'}</button>
//       </div>
//     </div>
//   )
// }


// import { useDispatch } from 'react-redux';
// import { addCartItem } from '../store/slices/cartSlice';
// import { addWishItem } from '../store/slices/wishListSlice';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// import { deleteProduct } from '../store/slices/productsSlice';

// export default function Product({ productId, title, rating, price, imageUrl }) {
//   const username = localStorage.getItem('username');
//   const isAdmin = username === 'Admin';
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); // For navigation to UpdateProduct page

//   // Handle delete for admin
//   const handleDelete = () => {
//     dispatch(deleteProduct(productId)); // Dispatch delete action
//   };

//   // Handle add to cart
//   const handleAddToCart = () => {
//     const cartKey = username ? `${username}cart` : 'cartItems';
//     let storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
//     const existingProductIndex = storedCart.findIndex(item => item.productId === productId);

//     if (existingProductIndex !== -1) {
//       storedCart[existingProductIndex].quantity += 1;
//     } else {
//       storedCart.push({ productId, quantity: 1 });
//     }

//     // Save updated cart
//     localStorage.setItem(cartKey, JSON.stringify(storedCart));

//     // Dispatch to add cart in Redux
//     dispatch(addCartItem({ productId }));
//   };

//   // Handle add to wishlist
//   const handleAddToWishList = () => {
//     const wishKey = username ? `${username}wish` : 'wishItems';
//     let storedWish = JSON.parse(localStorage.getItem(wishKey)) || [];
//     const existingProductIndex = storedWish.findIndex(item => item.productId === productId);

//     if (existingProductIndex === -1) {
//       storedWish.push({ productId, quantity: 1 });
//       localStorage.setItem(wishKey, JSON.stringify(storedWish));
//     } else {
//       console.log("Product already in wishlist.");
//     }

//     // Dispatch to add wishlist item in Redux
//     dispatch(addWishItem({ productId }));
//   };

//   // Handle update product (for admin)
//   const handleUpdateProduct = () => {
//     navigate(`/update-product/${productId}`, { state: { productId, title, rating, price, imageUrl } });
//   };

//   return (
//     <div className="product">
//       <div className="product-image">
//         <Link to={`/${productId}`}>
//           <img src={imageUrl} alt={title} />
//         </Link>
//       </div>
//       <div className="title-container">
//         <Link to={`/${productId}`}>
//           <h3 className='item-detail'>{title}</h3>
//         </Link>
//       </div>
//       <div className="price-rating-container">
//         <p className="rating">{+rating} ★ ★ ★ ★</p>
//         <p className="price">${price}</p>
//       </div>
//       <div className="cta-container">
//         {isAdmin ? (
//           <>
//             <button onClick={handleDelete}>Remove Item</button>
//             <button onClick={handleUpdateProduct}>Update Item</button>
//           </>
//         ) : (
//           <>
//             <button onClick={handleAddToCart}>Add to Cart</button>
//             <button onClick={handleAddToWishList}>Add to WishList</button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/slices/cartSlice';
import { addWishItem } from '../store/slices/wishListSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct } from '../store/slices/productsSlice';

export default function Product({ productId, title, rating, price, imageUrl }) {
  const username = localStorage.getItem('username');
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const isAdmin = username === existingAdmin.username;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation to UpdateProduct page

  // Handle delete for admin
  const handleDelete = () => {
    dispatch(deleteProduct(productId)); // Dispatch delete action
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const cartKey = username ? `${username}cart` : 'cartItems';
    let storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingProductIndex = storedCart.findIndex(item => item.productId === productId);

    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ productId, quantity: 1 });
    }

    // Save updated cart
    localStorage.setItem(cartKey, JSON.stringify(storedCart));

    // Dispatch to add cart in Redux
    dispatch(addCartItem({ productId }));
  };

  // Handle add to wishlist
  const handleAddToWishList = () => {
    const wishKey = username ? `${username}wish` : 'wishItems';
    let storedWish = JSON.parse(localStorage.getItem(wishKey)) || [];
    const existingProductIndex = storedWish.findIndex(item => item.productId === productId);

    if (existingProductIndex === -1) {
      storedWish.push({ productId, quantity: 1 });
      localStorage.setItem(wishKey, JSON.stringify(storedWish));
    } else {
      console.log("Product already in wishlist.");
    }

    // Dispatch to add wishlist item in Redux
    dispatch(addWishItem({ productId }));
  };

  // Handle update product (for admin)
  const handleUpdateProduct = () => {
    navigate(`/update-product/${productId}`, { state: { productId, title, rating, price, imageUrl } });
  };

  return (
    <div className="product">
      <div className="product-image">
        <Link to={`/${productId}`}>
          <img src={imageUrl} alt={title} />
        </Link>
      </div>
      <div className="title-container">
        <Link to={`/${productId}`}>
          <h3 className="item-detail">{title}</h3>
        </Link>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        {isAdmin ? (
          <>
            <button onClick={handleDelete}>Remove Item</button>
            <button onClick={handleUpdateProduct}>Update Item</button>
          </>
        ) : (
          <>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleAddToWishList}>Add to WishList</button>
          </>
        )}
      </div>
    </div>
  );
}


