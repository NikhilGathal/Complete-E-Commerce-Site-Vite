import React, { useEffect, useState } from 'react'
import './OrderList.css'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'

function AdminDashBoard() {
  const navigate = useNavigate()
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  const [orders, setOrders] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const isAdminLog = localStorage.getItem('isadminlog') === 'true'
  useEffect(() => {
    if (!isAdminLog) {
      navigate('/')
    }
  }, [isAdminLog])

  if (!isAdminLog) {
    return null // ✅ Prevents rendering if admin is not logged in
  }

  useEffect(() => {
    const handleResize = () => {}
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const userMap = users.reduce((map, user) => {
      map[user.username] = user
      return map
    }, {})
    setUserDetails(userMap)
    console.log(userMap)

    const storedOrders = JSON.parse(localStorage.getItem('Orders')) || []

    const flattenedOrders = storedOrders.map((orderGroup) => {
      const [orderId, username, orderDate, orderDetails, rating] = orderGroup
      return {
        username,
        orderId,
        orderDate,
        orderDetails,
        rating,
      }
    })

    const filteredOrders = flattenedOrders.filter((order) =>
      userMap.hasOwnProperty(order.username)
    )

    setOrders(flattenedOrders)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className={`order-container ${dark ? 'dark' : ''}`}>
      {isLoading ? (
        <div className="admin a">
          <h1>Loading Order Details...</h1>
        </div>
      ) : orders.length === 0 ? (
        <div className="admin a">
          <h1>No Orders Yet</h1>
        </div>
      ) : (
        <>
          <h1 className="ordhead">Order Details</h1>
          <div className={`order-grid ${dark ? 'dark' : ''}`}>
            <div className="grid-header">
              <div className="header-item amp">Username</div>
              <div className="header-item amp">User Details</div>
              <div className="header-item amp">Order Details</div>
              <div className="header-item amp">Total Price</div>
              <div className="header-item amp">User Experience</div>{' '}
              {/* ⭐ Added */}
            </div>

            <div className="grid-body">
              {orders.map((orderGroup, index) => {
                const user = userDetails[orderGroup.username] || {}
                const totalOrderPrice = orderGroup.orderDetails.items.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                )

                return (
                  <div key={index} className="grid-row">
                    <div className="amp grid-item username-column">
                      {orderGroup.username}
                      <p>Order ID: {orderGroup.orderId}</p>
                      <p>Order Date: {orderGroup.orderDate}</p>
                    </div>

                    <div className="grid-item user-details-column">
                      {user.email ? (
                        <div>
                          <p className="amp">Email: {user.email}</p>
                          <p className="amp">Phone: {user.phone}</p>
                          <p className="amp">Address: {user.address}</p>
                        </div>
                      ) : (
                        <p>No user details available</p>
                      )}
                    </div>
                    <div className="grid-item order-details-column">
                      {orderGroup.orderDetails.items?.map((product, idx) => (
                        <div key={idx} className="product-details ord">
                          <Link to={`/${product.id}`}>
                            <span className="amp userord">
                              Product: {product.title}
                            </span>
                          </Link>

                          <span className="amp">Product ID: {product.id}</span>
                          <span className="amp">
                            Quantity: {product.quantity}
                          </span>
                          <span className="amp">
                            Price: ${parseFloat(product.price).toFixed(2)}
                          </span>
                        </div>
                      )) || <p>No items available</p>}
                    </div>
                    <div className="amp grid-item price-column">
                      ${parseFloat(totalOrderPrice).toFixed(2)}
                    </div>

                    <div className="amp grid-item">
                      {orderGroup.rating ? (
                        <span className='stars'
                          style={{
                            color: dark ? 'gold' : '#ff6340',
                          }}
                        >
                          {'★'.repeat(orderGroup.rating)}
                          {'☆'.repeat(5 - orderGroup.rating)}
                        </span>
                      ) : (
                        <span>No rating</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default AdminDashBoard
