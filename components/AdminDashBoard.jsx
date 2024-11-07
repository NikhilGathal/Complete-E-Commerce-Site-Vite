


import React, { useEffect, useState } from 'react'
import './OrderList.css'; 
import { useOutletContext } from 'react-router-dom';
function AdminDashBoard() {

  const [setissign,dark,isdark,issign,userlogin] = useOutletContext()
  console.log(dark);
  

  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const allOrders = []; // To collect all orders

      // Loop through localStorage and fetch all user orders
      for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          
          // Check if the key corresponds to an order array (e.g., 'Nikhilorders', 'Aniketorders', etc.)
          if (key && key.endsWith('orders')) {
              const userOrders = JSON.parse(localStorage.getItem(key));
              
              // Check if there are orders for this user and if the data is valid
              if (Array.isArray(userOrders) && userOrders.length > 0) {
                  userOrders.forEach((order) => {
                      allOrders.push({
                          username: key.replace('orders', ''), // Extract username from key
                          ...order // Add order details
                      });
                  });
              }
          }
      }

      // Set the orders to state
      setOrders(allOrders);
  }, []);

  // Group the orders by username and calculate the total price for each user
  const groupedOrders = orders.reduce((acc, order) => {
      const { username, price } = order;
      if (!acc[username]) {
          acc[username] = { orders: [], totalPrice: 0 };
      }
      acc[username].orders.push(order);
      acc[username].totalPrice += price;
      return acc;
  }, {});

  return (
      <div className={ `order-grid  ${dark ? 'dark' : ''}`}>
          <div className="grid-header">
              <div className="header-item">Username</div>
              <div className="header-item">Orders</div>
              <div className="header-item">Total Price</div>
          </div>
          <div className="grid-body">
              {Object.keys(groupedOrders).map((username) => {
                  const { orders, totalPrice } = groupedOrders[username];
                  return (
                      <div key={username} className="grid-row">
                          <div className="grid-item">{username}</div>
                          <div className="grid-item">
                              {orders.map((order,index) => (
                                  <div className='ord' key={index}>
                                      <span>ProductID:{order.id}</span>  
                                      <span>{order.title}</span> 
                                      <span>Price: ${order.price}</span>
                                  </div>
                              ))}
                          </div>
                          <div className="grid-item">${totalPrice.toFixed(2)}</div>
                      </div>
                  );
              })}
          </div>
      </div>
  );
};

export default AdminDashBoard