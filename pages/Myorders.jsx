import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'
import { updateProductStock } from '../store/slices/productsSlice'
import { useDispatch } from 'react-redux'
function Myorders() {
  const navigate = useNavigate()
  const [isCancelling, setIsCancelling] = useState(false)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const username = localStorage.getItem('username')
  const [setissign, dark] = useOutletContext()
    const dispatch = useDispatch()

  useEffect(() => {
    const fetchLocalOrders = () => {
      const localOrders =
        JSON.parse(localStorage.getItem(`${username}orders`)) || []
      const allOrders = JSON.parse(localStorage.getItem('Orders')) || []

      const formattedOrders = localOrders.map((orderArr) => {
        const orderId = orderArr[0] // ✅ Extract all product objects starting from index 1

        const products = orderArr
          .slice(1)
          .filter((item) => typeof item === 'object') // ✅ Get the matching date from global Orders array

        const matchingGlobalOrder = allOrders.find(
          (globalOrder) => globalOrder[0] === orderId
        )
        const orderDate = matchingGlobalOrder?.[2] || 'N/A' // ✅ Compute total price from all products

        const totalPrice = products.reduce((sum, product) => {
          const price = parseFloat(product.price)
          const qty = parseInt(product.quantity)
          return sum + (isNaN(price * qty) ? 0 : price * qty)
        }, 0)

        return {
          id: orderId,
          orderDate,
          items: products,
          totalPrice,
        }
      })

      setOrders(formattedOrders)
      setTimeout(() => setIsLoading(false), 1000)
    }

    fetchLocalOrders()
  }, [username])

  const user = localStorage.getItem('userlogin') === 'true'
    
      useEffect(() => {
        if (!user) {
          navigate('/') // redirect if not logged in
        }
      }, [user])
       if (!user) {
    return null // Don't render anything until redirect is done
  }

  function handleCancelOrder(orderId) {
    if (!window.confirm('Are you sure you want to cancel this order?')) return

    const username = localStorage.getItem('username')
    const userOrders =
      JSON.parse(localStorage.getItem(`${username}orders`)) || []
    const allOrders = JSON.parse(localStorage.getItem('Orders')) || []

    const cancelledOrder = userOrders.find((order) => order[0] === orderId)
    if (!cancelledOrder) return

    const cancelledItems = cancelledOrder
      .slice(1)
      .filter((item) => typeof item === 'object') // ✅ Load products from correct key

    const allProducts = JSON.parse(localStorage.getItem('productsList')) || [] // ✅ Update stock count in productsList

    cancelledItems.forEach((cancelledItem) => {
      const index = allProducts.findIndex(
        (p) => String(p.id) === String(cancelledItem.id)
      )
      if (index !== -1) {
        allProducts[index].rating.count += parseInt(cancelledItem.quantity)

        // ✅ Dispatch Redux update to reflect stock increase
        dispatch(
          updateProductStock({
            productId: cancelledItem.id,
            delta: allProducts[index].rating.count,
          })
        )
      }
    }) // ✅ Save updated productsList back to localStorage

    localStorage.setItem('productsList', JSON.stringify(allProducts)) // ✅ Remove order from user and global order list

    const updatedUserOrders = userOrders.filter((order) => order[0] !== orderId)
    const updatedGlobalOrders = allOrders.filter(
      (order) => order[0] !== orderId
    )

    localStorage.setItem(`${username}orders`, JSON.stringify(updatedUserOrders))
    localStorage.setItem('Orders', JSON.stringify(updatedGlobalOrders)) // ✅ Update UI state

    setOrders(
      updatedUserOrders.map((order) => {
        const orderItems = order
          .slice(1)
          .filter((item) => typeof item === 'object')
        const global = updatedGlobalOrders.find((o) => o[0] === order[0])
        const orderDate = global?.[2] || 'N/A'
        const totalPrice = orderItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        return {
          id: order[0],
          orderDate,
          items: orderItems,
          totalPrice,
        }
      })
    ) // ✅ Send cancellation email

    const emailSentFlag = `cancelEmailSent_${orderId}`
    if (!localStorage.getItem(emailSentFlag)) {
      sendCancellationEmail(username, cancelledItems, orderId)
      localStorage.setItem(emailSentFlag, 'true')
    }
    setIsCancelling(true)
    setTimeout(() => {
      setIsCancelling(false)
      navigate('/OrderCancelConfirm', {
        state: { username },
      })
    }, 3000)
  }

  function sendCancellationEmail(username, cancelledItems, orderId) {
    const userData = JSON.parse(localStorage.getItem('users')) || []
    const adminData = JSON.parse(localStorage.getItem('Admin')) || {}

    const user = userData.find((user) => user.username === username)
    if (!user) return

    const { email, phone, address } = user

    const productDetailsString = cancelledItems
      .map((item) => {
        return `Product: ${item.title}\nQty: ${item.quantity}\nPrice: $${item.price}\n\n`
      })
      .join('')

    const emailParams = {
      username,
      useremail: email,
      user_phone: phone,
      user_address: address,
      order_Id: orderId,
      productDetails: productDetailsString,
      subject: `Order Cancelled: ${orderId}`,
    } // ✅ Send to User

    emailjs
      .send(
        'service_1he3ion',
        'template_ol5hoqk', // You must define this template in EmailJS
        emailParams,
        'pr4jd_3t8afuSTqrN'
      )
      .then((res) => {
        console.log('Cancellation email sent to user')
      })
      .catch((err) => console.error('User cancel email failed', err)) // ✅ Send to Admin

    emailjs
      .send(
        'service_1he3ion',
        'template_fcgtpi2', // Another template for admin
        {
          ...emailParams,
          admin_email: adminData.email,
          Name: 'Shopee',
        },
        'pr4jd_3t8afuSTqrN'
      )
      .then((res) => {
        console.log('Cancellation email sent to admin')
      })
      .catch((err) => console.error('Admin cancel email failed', err))
  }
  if (isCancelling) {
    return (
      <div className="admin">
        <h1 style={{ textAlign: 'center' }}>Cancelling your order...</h1>
      </div>
    )
  }

  return (
    <div className="order-container">
      {isLoading ? (
        <div className="admin">
          <h1>Loading Order Details...</h1>{' '}
        </div>
      ) : orders.length === 0 ? (
        <div className="adminr">
          <h1>No Orders Yet</h1>
          <Link to="/Home">
            <button className='returnb'>Return to Shop</button>
          </Link>
        </div>
      ) : (
        <>
          <h1 className="ordhead">My Orders</h1>
          <div className={`order-grid ${dark ? 'dark' : ''}`}>
            <div className="grid-header">
              <div className="amp u header-item">Order ID</div>
              <div className="amp us header-item">Order Date</div>
              <div className="amp o header-item">Order Details</div>
              <div className="amp t header-item">Total Price</div>
              <div className="amp header-item">Cancel</div>
            </div>

            <div className="grid-body">
              {orders.map((order, orderIndex) => (
                <div key={order.id} className="grid-row">
                  <div className="amp grid-item username-column">
                    {order.id}
                  </div>

                  <div className="amp grid-item user-details-column">
                    {order.orderDate}
                  </div>

                  <div className="grid-item orders-column">
                    {order.items.map((item, idx) => (
                      <div
                        className="ord"
                        key={`${order.id}-${item.id}-${idx}`}
                      >
                        <Link to={`/${item.id}`}>
                          <span className="userord amp">
                            Product: {item.title}
                          </span>
                        </Link>
                        <span className="amp">Quantity: {item.quantity}</span> 
                        <span className="amp">
                          Price: ${parseFloat(item.price).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="amp grid-item total-price-column">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                  <div className="amp grid-item cancel-button-column">
                    <button
                      className="cancel-btn"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Myorders
