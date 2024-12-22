



import React from 'react';
import emailjs from 'emailjs-com';
import { Link, useLocation } from 'react-router-dom';

const OrderConfirmation = () => {

  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const location = useLocation();
  const { username, cartItems, totalPrice } = location.state;

  const getUserDetails = (username) => {
    const users = JSON.parse(localStorage.getItem('users'));
    if (users) {
      const user = users.find((u) => u.username === username);
      if (user) {
        return {
          email: user.email,
          phone: user.phone,
          address: user.address,
        };
      }
    }
    return null;
  };

  const sendOrderEmail = () => {
    const userDetails = getUserDetails(username);

    if (userDetails) {
      const { email, phone, address } = userDetails;
      const orderDate = new Date();
      const order_date = orderDate.toLocaleDateString();
      const order_id = `OD${Date.now()}`;

      const products = cartItems.map((item) => ({
        product_name: item.title,
        quantity: item.quantity,
        // Ensure item.price is a number before using toFixed()
        product_price: parseFloat(item.price).toFixed(2),
        total_price: (parseFloat(item.price) * item.quantity).toFixed(2),
      }));

      const productDetailsString = products
        .map(
          (item) =>
            `Product: ${item.product_name}\nQty: ${item.quantity}\nPrice: $. ${item.product_price}\nTotal Amount: $. ${item.total_price}\n\n`
        )
        .join("");

      const completeTotal = products
        .reduce((sum, item) => sum + parseFloat(item.total_price), 0)
        .toFixed(2);

      const emailParams = {
        username,
        useremail: email,
        user_phone: phone,
        user_address: address,
        order_date,
        order_id,
        productDetails: productDetailsString,
        totalOrderPrice: parseFloat(totalPrice || 0).toFixed(2),
        completeTotal,
      };

      // Send email to the user
      emailjs
        .send(
          'service_xdyg5f6', // User's service ID
          'template_9w8s44b', // User's template ID
          emailParams,
          'e1rMsTvTE-ncRNQc2' // Public key
        )
        .then((response) => {
          console.log('Email sent to user successfully', response);
        })
        .catch((error) => {
          console.error('Error sending email to user', error);
        });

      // Send email to the admin
      const adminEmailParams = {
        ...emailParams,
        admin_email: existingAdmin.email, // Replace with the admin's email address
        subject: `New Order Received: ${order_id}`,
        productDetails: productDetailsString,
        Name :'Shopee'
      };

      emailjs
        .send(
          'service_xdyg5f6', // Admin's service ID (can be the same)
          'template_6x3qvh3', // Admin's template ID
          adminEmailParams,
          'e1rMsTvTE-ncRNQc2' // Public key
        )
        .then((response) => {
          console.log('Email sent to admin successfully', response);
        })
        .catch((error) => {
          console.error('Error sending email to admin', error);
        });
    } else {
      console.error('User details not found');
    }
  };

  React.useEffect(() => {
    sendOrderEmail();
  }, []);

  return (
  <>
      <div className="order-confirm">
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, {username}!</p>
      <p>We have sent the order details to your email.</p>
    </div>
    <div className='ord'>
    <Link to="/">
            <button>Return to Shop</button>
          </Link>
    </div>
  </>
  );
};

export default OrderConfirmation;

