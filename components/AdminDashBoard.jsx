import React, { useEffect, useState } from 'react';
import './OrderList.css'; 
import { useOutletContext } from 'react-router-dom';

function AdminDashBoard() {
  // console.log('Adminnnn');
  
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext();
  
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const allOrders = [];

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userMap = users.reduce((map, user) => {
      map[user.username] = user;
      return map;
    }, {});
    // console.log(userMap);
    
    setUserDetails(userMap);

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith('orders')) {
        const userOrders = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(userOrders) && userOrders.length > 0) {
          userOrders.forEach((order) => {
            allOrders.push({
              username: key.replace('orders', ''),
              ...order
            });
          });
        }
      }
    }
// console.log(allOrders);
setIsLoading(false)
    setOrders(allOrders);
  }, []);

  // const groupedOrders = orders.reduce((acc, order) => {
  //   const { username, price } = order;
  //   if (!acc[username]) {
  //     acc[username] = { orders: [], totalPrice: 0 };
  //   }
  //   acc[username].orders.push(order);
  //   acc[username].totalPrice += price;
  //   return acc;
  // }, {});
// console.log(groupedOrders);
const groupedOrders = orders.reduce((acc, order) => {
  const { username, price } = order;
  if (!acc[username]) {
    acc[username] = { orders: [], totalPrice: 0 };
  }
  acc[username].orders.push(order);
  // Make sure price is a number
  acc[username].totalPrice += parseFloat(price) || 0;  // fallback to 0 if it's not a valid number
  return acc;
}, {});

  const hasOrders = Object.keys(groupedOrders).length > 0;
 
  return (
  <>
      <div className={`order-grid ${dark ? 'dark' : ''}`}>
      {hasOrders && (
        <div className="grid-header">
          <div className="u header-item">Username</div>
          <div className="us header-item">User Details</div>
          <div className="o header-item">Orders</div>
          <div className="t header-item">Total Price</div>
        </div>
      )}
      <div className="grid-body">
        {Object.keys(groupedOrders).map((username, index) => {
          const { orders, totalPrice } = groupedOrders[username];
          const user = userDetails[username];

          if (orders.length === 0) {
            return null;
          }

          const gridColumnStyle = isMobile ? { gridColumn: index + 2 } : {};

          return (
            <div key={username} className="grid-row">
              <div style={gridColumnStyle} className="grid-item username-column">{username}</div>
              <div style={gridColumnStyle} className="grid-item user-details-column">
                {user ? (
                  <div>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address: {user.address}</p>
                  </div>
                ) : (
                  <p>No user details available</p>
                )}
              </div>
              <div style={gridColumnStyle} className="grid-item orders-column">
                {orders.map((order, index) => (
                  <div className="ord" key={index}>
                    <span>ProductID: {order.id}</span>
                    <span>Price: ${order.price}</span>
                  </div>
                ))}
              </div>
              <div style={gridColumnStyle} className="grid-item total-price-column">
                ${totalPrice.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {!hasOrders && !isLoading && <h1 className='admin'>No Orders Yet</h1>}
  </>
  );
}

export default AdminDashBoard;
