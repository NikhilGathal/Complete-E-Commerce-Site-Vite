// import React, { useEffect, useState } from "react";
// import Myordersitem from "../components/Myordersitem";

// function Myorders() {
//   const [isLoading, setIsLoading] = useState(true);
//   const username = localStorage.getItem("username");

//   // Get the orders from localStorage
//   const rawOrders = JSON.parse(localStorage.getItem(`${username}orders`)) || [];

//   // Flatten the nested structure and extract product details
//   const Myorders = rawOrders.flatMap((order) => order.slice(1)); // Skip the first element (order ID)

//   useEffect(() => {
//     const simulateLoading = () => {
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 1000); // Simulate API fetch delay
//     };
//     simulateLoading();
//   }, []);

//   return (
//     <div className={`order-container`}>
//       {isLoading ? (
//         <div className="admin">
//           <h1>Loading Order Details...</h1>
//         </div>
//       ) : Myorders.length === 0 ? (
//         <div className="admin">
//           <h1>No Orders Yet</h1>
//         </div>
//       ) : (
//         <main className="cart-container">
//           <div className="cart-container">
//             <h2 className="item-wish">My Orders</h2>
//             <div className="cart-items-container">
//               <div className="cart-header cart-item-container">
//                 <div className="cart-item">Item</div>
//                 <div>Price</div>
//                 <div className="total"></div>
//               </div>
//               {Myorders.map(({ id, title, rating, price, image, quantity }, index) => (
//                 <Myordersitem
//                   productId={id}
//                   key={`${id}-${index}`}
//                   title={title}
//                   price={price}
//                   quantity={quantity}
//                   imageUrl={image}
//                   rating={rating.rate}
//                   index={index}
//                 />
//               ))}
//               <div className="cart-header cart-item-container">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// }

// export default Myorders;



import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Myorders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");
  const [setissign, dark] = useOutletContext();

  useEffect(() => {
    const fetchLocalOrders = () => {
      const localOrders = JSON.parse(localStorage.getItem(`${username}orders`)) || [];
      const allOrders = JSON.parse(localStorage.getItem("Orders")) || [];

      const formattedOrders = localOrders.map(orderArr => {
        const orderId = orderArr[0];

        // ✅ Extract all product objects starting from index 1
        const products = orderArr.slice(1).filter(item => typeof item === "object");

        // ✅ Get the matching date from global Orders array
        const matchingGlobalOrder = allOrders.find(globalOrder => globalOrder[0] === orderId);
        const orderDate = matchingGlobalOrder?.[2] || "N/A";

        // ✅ Compute total price from all products
        const totalPrice = products.reduce((sum, product) => {
          const price = parseFloat(product.price);
          const qty = parseInt(product.quantity);
          return sum + (isNaN(price * qty) ? 0 : price * qty);
        }, 0);

        return {
          id: orderId,
          orderDate,
          items: products,
          totalPrice
        };
      });

      setOrders(formattedOrders);
      setTimeout(() => setIsLoading(false), 1000);
    };

    fetchLocalOrders();
  }, [username]);

  return (
    <div className="order-container">
      {isLoading ? (
        <div className="admin">
          <h1>Loading Order Details...</h1>
        </div>
      ) : orders.length === 0 ? (
        <div className="admin">
          <h1>No Orders Yet</h1>
        </div>
      ) : (
        <>
          <h1 className="ordhead">My Orders</h1>
          <div className={`order-grid ${dark ? "dark" : ""}`}>
            <div className="grid-header">
              <div className="amp u header-item">Order ID</div>
              <div className="amp us header-item">Order Date</div>
              <div className="amp o header-item">Order Details</div>
              <div className="amp t header-item">Total Price</div>
            </div>
            <div className="grid-body">
              {orders.map((order, orderIndex) => (
                <div key={order.id} className="grid-row">
                  <div className="amp grid-item username-column">{order.id}</div>
                  <div className="amp grid-item user-details-column">
                    {order.orderDate}
                  </div>
                  <div className="grid-item orders-column">
                    {order.items.map((item, idx) => (
                      <div className="ord" key={`${order.id}-${item.id}-${idx}`}>
                        <Link to={`/${item.id}`}>
                          <span className="userord amp">Product: {item.title}</span>
                        </Link>
                        <span className="amp">Quantity: {item.quantity}</span>
                        <span className="amp">Price: ${parseFloat(item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="amp grid-item total-price-column">
                    ${order.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Myorders;























// import React from 'react';
// import Myordersitem from '../components/Myordersitem';

// function Myorders() {
//   const username = localStorage.getItem('username');

//   // Get the orders from localStorage
//   const rawOrders = JSON.parse(localStorage.getItem(`${username}orders`)) || [];

//   // Flatten the nested structure and extract product details
//   const Myorders = rawOrders.flatMap(order => order.slice(1)); // Skip the first element (order ID)

//   // console.log(Myorders);

//   return (
//     <>
//       {Myorders.length ? (
//         <main className="cart-container">
//           <div className="cart-container">
//             <h2 className="item-wish">My Orders</h2>
//             <div className="cart-items-container">
//               <div className="cart-header cart-item-container">
//                 <div className="cart-item">Item</div>
//                 <div>Price</div>
//                 <div className="total"></div>
//               </div>
//               {Myorders.map(({ id, title, rating, price, image, quantity }, index) => (
//                 <Myordersitem
//                   productId={id}
//                   key={`${id}-${index}`}
//                   title={title}
//                   price={price}
//                   quantity={quantity}
//                   imageUrl={image}
//                   rating={rating.rate}
//                   index={index}
//                 />
//               ))}
//               <div className="cart-header cart-item-container">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//             </div>
//           </div>
//         </main>
//       ) : (
//         <div className="empty-wish-container">
//           <h1 className="empty-wish">No Orders Yet</h1>
//         </div>
//       )}
//     </>
//   );
// }

// export default Myorders;
