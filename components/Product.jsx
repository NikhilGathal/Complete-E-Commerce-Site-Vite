


import { useDispatch } from 'react-redux';
import { addCartItem } from '../store/slices/cartSlice';
import { addWishItem } from '../store/slices/wishListSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { deleteProduct } from '../store/slices/productsSlice';

export default function Product({ productId, title, rating, price, imageUrl }) {
  // console.log(rating.rate);
  // console.log(rating.count);
  const storedProducts = JSON.parse(localStorage.getItem("productsList")) || [];
  const [productCount, setProductCount] = useState(storedProducts[productId-1].rating.count);
  
  
  const username = localStorage.getItem('username');
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const isAdmin = username === existingAdmin.username;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // For navigation to UpdateProduct page

  // Handle delete for admin
  const handleDelete = () => {
    dispatch(deleteProduct(productId)); // Dispatch delete action
  };

const updateProductCount = (productId, delta) => {
  const products = JSON.parse(localStorage.getItem('productsList')) || [];
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index].rating.count += delta;
    if (products[index].rating.count < 0) products[index].rating.count = 0;

    localStorage.setItem('productsList', JSON.stringify(products));
    setProductCount(products[index].rating.count); // ✅ update state too
  }
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
   if (localStorage.getItem('username')) {
  updateProductCount(productId, -1) // reduce stock
}
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
        <p className="rating">{+rating.rate} ★ ★ ★ ★</p>
     {isAdmin && (
  <p className="price">Stock : {productCount}</p>
)}
        <p className="price">${price}</p>
      </div>
       <div className="cta-container">
        {isAdmin ? (
          <>
            <button onClick={handleDelete}>Remove </button>
            <button onClick={handleUpdateProduct}>Edit </button>
          </>
        ) : (
          <>
            {productCount > 0  > 0 ? (
              <button onClick={handleAddToCart}>Add to Cart</button>
            ) : (
              <button disabled style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                Out of Stock
              </button>
            )}
            <button onClick={handleAddToWishList}>Add to WishList</button>
          </>
        )}
      </div>
    </div>
  );
}


