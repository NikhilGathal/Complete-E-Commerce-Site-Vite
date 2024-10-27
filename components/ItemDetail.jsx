
import React, { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import './ItemDetail.css';
import { useDispatch } from 'react-redux'
import { addCartItem } from '../store/slices/cartSlice';
import { addWishItem } from '../store/slices/wishListSlice';
import Footer from './Footer'
const ItemDetail = () => {
    const dispatch = useDispatch()
    let { productId } = useParams();   // Get the itemId from the URL
    productId = +productId
    // const productId =  itemId
    // console.log(productId);
    
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [,dark] = useOutletContext()
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                // Check if the response is ok (status 200-299)
                if (!response.ok) {
                    throw new Error(`Failed to fetch item. Status: `);
                }
                // Ensure the response has content before parsing
                const data = await response.json();
                if (!data) {
                    throw new Error('No data received');
                }
                setItem(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchItem();
    }, [productId]);

    if (loading) return <> <div className='error-msg'>Loading...</div>  <Footer dark={dark} />  </>;
    if (error) return <> <div className='error-msg' > Error : Product Not Found</div>   <Footer dark={dark} /> </>;
    return (
        <>
        <div className={`item-detail-container ${ dark ? 'dark' : ''}`}>
            <div className="item-image">
                <img src={item.image} alt={item.title} />
            </div>
            <div className="item-info">
                <h1>{item.title}</h1>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <p className="item-description">{item.description}</p>
                <p className="item-category">Category: {item.category}</p>
                <div className="item-rating">
                    <span>Rating: {item.rating.rate} / 5 ({item.rating.count} reviews)</span>
                </div>
               <div className='item-button'>
               <button  
                     onClick={() => {
                      const username = localStorage.getItem('username');
                      const cartKey = username ? `${username}cart` : 'cartItems';
                      let storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
                    
                      // Check if the product already exists in the cart
                      const existingProductIndex = storedCart.findIndex(item => item.productId === productId);
                      if (existingProductIndex !== -1) {
                        // If it exists, increment the quantity
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
                    
               >Add to cart</button>
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
                
                // Dispatch the action to add to wishlist in Redux
                dispatch(addWishItem({ productId }));
              }}
              
               >Add to wishlist</button>
               </div>
            </div>
        </div>
        <Footer dark={dark}/>
        </>
         
    );
};

export default ItemDetail;

