import React from 'react'
import { useDispatch } from 'react-redux'
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from '../store/slices/cartSlice'
import { Link } from 'react-router-dom'

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch()
  const handleRemove = () => {
    const username = localStorage.getItem('username')
    const cartKey = username ? `${username}cart` : 'cartItems'
    let storedCart = JSON.parse(localStorage.getItem(cartKey)) || []
    const updatedCart = storedCart.filter(
      (item) => item.productId !== productId
    )
    localStorage.setItem(cartKey, JSON.stringify(updatedCart))
    dispatch(removeCartItem({ productId }))
  }
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <Link to={`/${productId}`}>
          {' '}
          <img src={imageUrl} alt={title} />{' '}
        </Link>
        <div>
          <Link to={`/${productId}`}>
            {' '}
            <h3>{title}</h3>{' '}
          </Link>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>

      <div className="">${price}</div>
      <div className="item-quantity">
        <button
          onClick={() => {
            const username = localStorage.getItem('username')
            const cartKey = username ? `${username}cart` : 'cartItems'
            let storedCart = JSON.parse(localStorage.getItem(cartKey)) || []
            const existingProductIndex = storedCart.findIndex(
              (item) => item.productId === productId
            )
            if (existingProductIndex !== -1) {
              // Decrease quantity
              storedCart[existingProductIndex].quantity -= 1
              if (storedCart[existingProductIndex].quantity === 0) {
                // Remove item from localStorage if quantity is zero
                storedCart.splice(existingProductIndex, 1)
              }
              // Save the updated cart back to localStorage
              localStorage.setItem(
                username ? `${username}cart` : 'cartItems',
                JSON.stringify(storedCart)
              )
            }
            // Dispatch the action to decrease the quantity in Redux
            dispatch(decreaseCartItemQuantity({ productId }))
          }}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => {
            const username = localStorage.getItem('username')
            const cartKey = username ? `${username}cart` : 'cartItems'
            let storedCart = JSON.parse(localStorage.getItem(cartKey)) || []
            const existingProductIndex = storedCart.findIndex(
              (item) => item.productId === productId
            )
            if (existingProductIndex !== -1) {
              // Increase quantity
              storedCart[existingProductIndex].quantity += 1
            } else {
              // If it doesn't exist, add a new object with productId and quantity
              storedCart.push({ productId, quantity: 1 })
            }
            // Save the updated cart back to localStorage
            localStorage.setItem(
              username ? `${username}cart` : 'cartItems',
              JSON.stringify(storedCart)
            )
            // Dispatch the action to increase the quantity in Redux
            dispatch(increaseCartItemQuantity({ productId }))
          }}
        >
          +
        </button>
      </div>
      <div className="item-total">${quantity * price}</div>
      <div>
        <button className="remove" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  )
}
