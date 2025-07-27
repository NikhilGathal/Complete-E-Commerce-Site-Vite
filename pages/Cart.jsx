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
import { updateProductStock } from '../store/slices/productsSlice'

export default function Cart() {
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  const error = useSelector(getCartError)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const cartItems = useSelector(getAllCartItems)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  // console.log(cartItems)

  const navigate = useNavigate()
  const username = localStorage.getItem('username')
  console.log(cartItems)

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
      <div className="admin">
        <h1>Loading Cart Items...</h1>
      </div>
    )
  }
  if (isPlacingOrder) {
    return (
      <div className="admin">
        <h1 style={{ textAlign: 'center' }}>Processing your order...</h1>
      </div>
    )
  }

  return (
    <>
      {' '}
      {cartItems.length ? (
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

                    if (!adminFromStorage) {
                      alert(
                        'Sign up as admin first before placing an order. After that, log in as a normal user to place an order.'
                      )
                      return
                    }

                    const existingAdmin = JSON.parse(adminFromStorage)

                    if (!username) {
                      alert('Please login first to place an order')
                      return
                    }

                    if (username === existingAdmin.username) {
                      alert('Please login as a normal user to place an order')
                      return
                    }

                    const products =
                      JSON.parse(localStorage.getItem('productsList')) || []

                    // 🔎 Validate stock
                    for (const item of cartItems) {
                      const index = products.findIndex((p) => p.id === item.id)
                      // console.log(index)

                      const available =
                        index !== -1 ? products[index].rating.count : 0
                      // console.log(available)

                      if (available === 0) {
                        alert(
                          `"${item.title}" is out of stock. Please remove it from the cart then try to place the order.`
                        )
                        return
                      }
                      if (item.quantity > available) {
                        alert(
                          `"${item.title}" has only ${available} in stock. You added ${item.quantity}. Please update your cart then try to place order.`
                        )
                        return
                      }
                    }

                    // ✅ All checks passed — proceed
                    setIsPlacingOrder(true)

                    setTimeout(() => {
                      // ✅ Reduce stock in localStorage
                      cartItems.forEach((item) => {
                        const index = products.findIndex(
                          (p) => p.id === item.id
                        )
                        if (index !== -1) {
                          products[index].rating.count -= item.quantity
                          if (products[index].rating.count < 0) {
                            products[index].rating.count = 0
                          }

                          // ✅ Dispatch Redux update for live UI sync
                          dispatch(
                            updateProductStock({
                              productId: item.id,
                              delta: -item.quantity,
                            })
                          )
                        }
                      })

                      localStorage.setItem(
                        'productsList',
                        JSON.stringify(products)
                      )

                      // ✅ Save to user's orders
                      const existingUserOrders =
                        JSON.parse(localStorage.getItem(`${username}orders`)) ||
                        []
                      existingUserOrders.push([order_Id, ...cartItems])
                      localStorage.setItem(
                        `${username}orders`,
                        JSON.stringify(existingUserOrders)
                      )

                      // ✅ Save to global orders
                      const existingOrders =
                        JSON.parse(localStorage.getItem('Orders')) || []
                      const date = new Date()
                      const formattedDate = date.toLocaleString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true,
                      })

                      existingOrders.push([
                        order_Id,
                        username,
                        formattedDate,
                        { items: cartItems, totalPrice },
                      ])
                      localStorage.setItem(
                        'Orders',
                        JSON.stringify(existingOrders)
                      )

                      // ✅ Clear cart
                    

                      setIsPlacingOrder(false)

                      // ✅ Navigate to confirmation page
                      navigate('/OrderConfirmation', {
                        state: {
                          username,
                          cartItems,
                          totalPrice,
                          order_Id,
                        },
                      })
                        dispatch(removeallCartItem())
                      localStorage.removeItem(`${username}cart`)
                    }, 3000)
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
          <Link to="/Home">
            <button>Return to Shop</button>
          </Link>
        </div>
      )}
    </>
  )
}
