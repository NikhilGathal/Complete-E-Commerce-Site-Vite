import React, { useState, useEffect } from 'react'
import CartItem from '../components/CartItem'
import empty from '../assets/empty.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCartItems,
  getCartError,
  removeallCartItem,
} from '../store/slices/cartSlice'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

export default function Cart() {
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  const error = useSelector(getCartError)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const cartItems = useSelector(getAllCartItems)
  console.log(cartItems)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    fetchCartItems()
  }, [])

  const totalPrice = cartItems
    .reduce((sum, order) => sum + order.price * order.quantity, 0)
    .toFixed(2)

  if (isLoading) {
    return (
      <h1 className="Load" style={{ textAlign: 'center' }}>
        Loading Cart items...
      </h1>
    )
  }

  return (
    <>
      {isLoading ? (
        <h1 style={{ textAlign: 'center' }}>Loading Cart items...</h1>
      ) : cartItems.length ? (
        <main className={`cart-container ${dark ? 'dark' : ''}`}>
          <div className="cart-container">
            <h2 className="item-wish">Cart Items</h2>
            <div className="cart-items-container">
              <div className="cart-header cart-item-container">
                <div className="cart-item">Item</div>
                <div className="">Price</div>
                <div className="quantity">Quantity</div>
                <div className="total">Total</div>
                <div className="remove">Remove</div>
              </div>
              {cartItems.map(
                ({ id, title, rating, price, image, quantity }) => (
                  <CartItem
                    key={id}
                    productId={id}
                    title={title}
                    price={price}
                    quantity={quantity}
                    imageUrl={image}
                    rating={rating.rate}
                  />
                )
              )}
              <div className="cart-header cart-item-container">
                <button
                  onClick={() => {
                    const order_Id = 'OD' + Date.now()
                    const username = localStorage.getItem('username')
                    const adminFromStorage = localStorage.getItem('Admin')

                    // Condition 1: Check if Admin exists in localStorage
                    if (!adminFromStorage) {
                      alert(
                        'Sign up as admin first before placing an order. After that, log in as a normal user to place an order.'
                      )
                      return
                    }

                    const existingAdmin = JSON.parse(adminFromStorage)

                    // Condition 2: Check if user is logged in
                    if (!username) {
                      alert('Please login first to place an order')
                      return
                    }

                    // Condition 3: Check if logged-in user is the Admin
                    if (username === existingAdmin.username) {
                      alert('Please login as a normal user to place an order')
                      return
                    }

                    // If all conditions are met, proceed with placing the order
                    dispatch(removeallCartItem())
                    localStorage.removeItem(`${username}cart`)
                    navigate('/OrderConfirmation', {
                      state: {
                        username,
                        cartItems,
                        totalPrice,
                        order_Id
                      },
                    })

                    // Save the order for the user
                    const existingOrders =
                      JSON.parse(localStorage.getItem(`${username}orders`)) ||
                      []
                    // Push the current cart items as a new array (representing the order)
                    existingOrders.push([order_Id,...cartItems])
                    // Update localStorage
                    localStorage.setItem(
                      `${username}orders`,
                      JSON.stringify(existingOrders)
                    )
                  }}
                  className="place"
                >
                  Place Order
                </button>
                <div></div>
                <div></div>
                <div className="sum-total">${totalPrice}</div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <div className="empty-cart">
          <img src={empty} />
          <h1>Your Cart is Empty</h1>
          <Link to="/">
            <button>Return to Shop</button>
          </Link>
        </div>
      )}
    </>
  )
}
