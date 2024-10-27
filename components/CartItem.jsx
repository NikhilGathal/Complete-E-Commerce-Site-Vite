import React from 'react'
import { useDispatch } from 'react-redux'
import {
  decreaseCartItemQuantity,
  increaseCartItemQuantity,
  removeCartItem,
} from '../store/slices/cartSlice'

export default function CartItem({
  productId,
  title,
  rating,
  price,
  imageUrl,
  quantity,
}) {
  const dispatch = useDispatch()
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
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
                username ? `${username}logincart` : 'cartItems',
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
              username ? `${username}logincart` : 'cartItems',
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
        {' '}
        <button
          className="remove"
          onClick={() => {
            const username = localStorage.getItem('username')
            const cartKey = username ? `${username}cart` : 'cartItems'
            let storedCart = JSON.parse(localStorage.getItem(cartKey)) || []
            // Find the index of the product to be removed
            const existingProductIndex = storedCart.findIndex(
              (item) => item.productId === productId
            )
            // console.log(productId)
            if (existingProductIndex !== -1) {
              // Remove item from local storage
              storedCart.splice(existingProductIndex, 1)
              // Save the updated cart back to localStorage
              localStorage.setItem(
                username ? `${username}cart` : 'cartItems',
                JSON.stringify(storedCart)
              )
            }
            // Dispatch the action to remove the item from Redux
            dispatch(removeCartItem(productId))
          }}
        >
          Remove
        </button>{' '}
      </div>
    </div>
  )
}
