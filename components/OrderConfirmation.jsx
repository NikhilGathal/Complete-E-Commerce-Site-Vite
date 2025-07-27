import React, { useEffect, useState } from 'react'
import emailjs from 'emailjs-com'
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from 'react-router-dom'
const OrderConfirmation = () => {
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext()
  const [count, setCount] = useState(0)
  const [selected, setSelected] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [issub, setissub] = useState(false)
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const location = useLocation()
  const { username, cartItems, totalPrice, order_Id } = location.state
  const navigate = useNavigate()
  const user = localStorage.getItem('userlogin') === 'true'

  useEffect(() => {
    if (!user) {
      navigate('/') // redirect if not logged in
    }
  }, [user])
  if (!user) {
    return null // Don't render anything until redirect is done
  }

  const getUserDetails = (username) => {
    const users = JSON.parse(localStorage.getItem('users'))
    if (users) {
      const user = users.find((u) => u.username === username)
      if (user) {
        return {
          email: user.email,
          phone: user.phone,
          address: user.address,
        }
      }
    }
    return null
  }

  const sendOrderEmail = () => {
    const userDetails = getUserDetails(username)

    if (userDetails) {
      const { email, phone, address } = userDetails
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
      // const order_id = `OD${Date.now()}`;

      const products = cartItems.map((item) => ({
        product_name: item.title,
        quantity: item.quantity,
        // Ensure item.price is a number before using toFixed()
        product_price: parseFloat(item.price).toFixed(2),
        total_price: (parseFloat(item.price) * item.quantity).toFixed(2),
      }))

      const productDetailsString = products
        .map(
          (item) =>
            `Product: ${item.product_name}\nQty: ${item.quantity}\nPrice: $. ${item.product_price}\nTotal Amount: $. ${item.total_price}\n\n`
        )
        .join('')

      const completeTotal = products
        .reduce((sum, item) => sum + parseFloat(item.total_price), 0)
        .toFixed(2)

      const emailParams = {
        username,
        useremail: email,
        user_phone: phone,
        user_address: address,
        formattedDate,
        order_Id,
        productDetails: productDetailsString,
        totalOrderPrice: parseFloat(totalPrice || 0).toFixed(2),
        completeTotal,
      }

      // Send email to the user
      emailjs
        .send(
          'service_xdyg5f6', // User's service ID
          'template_9w8s44b', // User's template ID
          emailParams,
          'e1rMsTvTE-ncRNQc2' // Public key
        )
        .then((response) => {
          console.log('Email sent to user successfully', response)
        })
        .catch((error) => {
          console.error('Error sending email to user', error)
        })

      // Send email to the admin
      const adminEmailParams = {
        ...emailParams,
        admin_email: existingAdmin.email, // Replace with the admin's email address
        subject: `New Order Received: ${order_Id}`,
        productDetails: productDetailsString,
        Name: 'Shopee',
      }

      emailjs
        .send(
          'service_xdyg5f6', // Admin's service ID (can be the same)
          'template_6x3qvh3', // Admin's template ID
          adminEmailParams,
          'e1rMsTvTE-ncRNQc2' // Public key
        )
        .then((response) => {
          console.log('Email sent to admin successfully', response)
        })
        .catch((error) => {
          console.error('Error sending email to admin', error)
        })
    } else {
      console.error('User details not found')
    }
  }

  React.useEffect(() => {
    const hasSentEmail = localStorage.getItem(`emailSentForOrder_${order_Id}`)

    if (!hasSentEmail && username && cartItems) {
      sendOrderEmail()
      localStorage.setItem(`emailSentForOrder_${order_Id}`, 'true') // ✅ Set flag
    }
  }, [])
  // When Submit button is clicked
  const handleSubmitRating = () => {
    setCount(selected)
    setSubmitted(true)

    if (order_Id) {
      localStorage.setItem(`rating_${order_Id}`, selected)
      const existingOrders = JSON.parse(localStorage.getItem('Orders')) || []
      const updatedOrders = existingOrders.map((order) => {
        if (order[0] === order_Id) {
          return [...order.slice(0, 4), selected] // inject rating
        }
        return order
      })
      localStorage.setItem('Orders', JSON.stringify(updatedOrders))
    }
  }

  const handleStarClick = (val) => {
    if (!submitted) {
      setSelected(val)
    }
  }

  useEffect(() => {
    if (order_Id) {
      const existingOrders = JSON.parse(localStorage.getItem('Orders')) || []
      const matchedOrder = existingOrders.find((order) => order[0] === order_Id)

      if (matchedOrder && matchedOrder.length >= 5) {
        const savedRating = Number(matchedOrder[4])
        setCount(savedRating)
        setSelected(savedRating)
        setSubmitted(true)
      } else {
        setSubmitted(false)
      } // ✅ This is important:

      setissub(true)
    }
  }, [order_Id])

  return (
    <>
      <div className="order-confirm">
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, {username}!</p>
        <p>We have sent the order details to your email.</p>

        {/* ⭐ Add Star Rating here */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {issub &&
            (!submitted ? (
              <>
                <h2>Rate your experience</h2>
                <div style={{ marginTop: '10px' }}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      className="staro"
                      key={val}
                      onClick={() => handleStarClick(val)}
                      style={{
                        color:
                          (submitted ? count : selected) >= val
                            ? dark
                              ? 'gold'
                              : '#ff6340'
                            : 'grey',
                        cursor: 'pointer',
                      }}
                    >
                      {(submitted ? count : selected) >= val ? '★' : '☆'}
                    </span>
                  ))}{' '}
                </div>

                <button
                  className="ordc"
                  onClick={handleSubmitRating}
                  style={{
                    marginTop: '15px',

                    cursor: selected > 0 ? 'pointer' : 'not-allowed',
                    borderRadius: '5px',
                    marginBottom: '20px',
                    border: '2px solid black',
                  }}
                  disabled={selected === 0}
                >
                  Submit Rating
                </button>
              </>
            ) : (
              <p style={{ fontSize: '24px', marginTop: '20px' }}>
                ✅ Thanks for rating us {count} star{count > 1 ? 's' : ''}!
              </p>
            ))}
        </div>
      </div>
      <div className="ord">
        <Link to="/Home">
          <button className="ordc">Continue shopping</button>
        </Link>
      </div>
    </>
  )
}

export default OrderConfirmation
