import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import empty from '../assets/empty.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCartItems,
  getCartError,
  removeallCartItem,
} from '../store/slices/cartSlice'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

export default function Cart() {
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  const error = useSelector(getCartError)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const cartItems = useSelector(getAllCartItems)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartItems = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    fetchCartItems()
  }, [])

  if (isLoading) {
    return <h1 className='Load' style={{ textAlign: 'center' }}>Loading Cart items...</h1> // Correct return statement
  }

  return (
    <>
      {isLoading ? ( // Display loading state until data is fetched
        <h1  style={{ textAlign: 'center' }}>Loading Cart items...</h1>
      ) : cartItems.length ? ( // Check for items after loading is done
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
                    const username = localStorage.getItem('username')
                    // console.log(username);
                    
                    if (username) {

                      if(username === "Admin")
                        {
                          alert('Please Login As normal user')
                        }


                      dispatch(removeallCartItem())
                      localStorage.removeItem(`${username}cart`)
                      navigate('/Order') // Navigate to the Order page only if username exists
                      const existingOrders =
                        JSON.parse(localStorage.getItem(`${username}orders`)) ||[]
                      existingOrders.push(...cartItems)
                      localStorage.setItem( `${username}orders`,JSON.stringify(existingOrders))
                    } 
                    
                    
                    else {
                      alert('Please Login First')
                    }
                  }}
                  className="place"
                >
                  Place Order
                </button>
                <div></div>
                <div></div>
                <div className="sum-total">
                  $
                  {cartItems
                    .reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
                    .toFixed(1)}
                </div>
                <div></div>
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











