// import React, { useEffect, useState } from "react";
// import "./OrderList.css";
// import { useOutletContext } from "react-router-dom";

// function AdminDashBoard() {
//   const [setissign, dark, isdark, issign, userlogin] = useOutletContext();
//   const [orders, setOrders] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       // Placeholder for resize logic if needed
//     };
//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const allOrders = [];
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const userMap = users.reduce((map, user) => {
//       map[user.username] = user;
//       return map;
//     }, {});

//     setUserDetails(userMap);

//     // Fetch all orders from the "Orders" key in localStorage
//     const storedOrders = JSON.parse(localStorage.getItem("Orders")) || [];
//     // console.log(storedOrders[0][2]);  // Log the raw date from the storage

//     // Use flatMap to flatten the array of arrays
//     const flattenedOrders = storedOrders.flatMap((orderGroup) => {
//       const username = orderGroup[1]; // Username is at index 1
//       const orderId = orderGroup[0]; // Order ID is at index 0
//       const orderDate = orderGroup[2]; // Order Date is at index 2 (no formatting)
//       const orderDetails = orderGroup[3]; // Order Details are at index 3

//       return {
//         username,
//         orderId,
//         orderDate,  // Directly assigning the raw date
//         orderDetails,
//       };
//     });

//     setIsLoading(false);
//     setOrders(flattenedOrders);
//   }, []);

//   return (
//     <>
//       <h1 className="ordhead">Order Details</h1>
//       <div className={`order-grid ${dark ? "dark" : ""}`}>
//         {orders.length > 0 && (
//           <div className="grid-header">
//             <div className="header-item amp">Username</div>
//             <div className="header-item amp">User Details</div>
//             <div className="header-item amp">Order Details</div>
//             <div className="header-item amp">Total Price</div>
//           </div>
//         )}

//         <div className="grid-body">
//           {orders.map((orderGroup, index) => {
//             const user = userDetails[orderGroup.username] || {};
//             const totalOrderPrice = orderGroup.orderDetails.items.reduce(
//               (total, product) => total + product.price * product.quantity,
//               0
//             );

//             // Displaying raw date without formatting
//             return (
//               <div key={index} className="grid-row">
//                 <div className="amp grid-item username-column">
//                   {orderGroup.username}
//                   <p>Order ID: {orderGroup.orderId}</p>
//                   <p>Order Date: {orderGroup.orderDate}</p> {/* Displaying raw date */}
//                 </div>
//                 <div className="grid-item user-details-column">
//                   {user.email ? (
//                     <div>
//                       <p className="amp">Email: {user.email}</p>
//                       <p className="amp">Phone: {user.phone}</p>
//                       <p className="amp">Address: {user.address}</p>
//                     </div>
//                   ) : (
//                     <p>No user details available</p>
//                   )}
//                 </div>
//                 <div className="grid-item order-details-column">
//                   {orderGroup.orderDetails.items?.map((product, idx) => (
//                     <div key={idx} className="product-details">
//                       <span className="amp">Product: {product.title}</span>
//                       <span className="amp">Product ID: {product.id}</span>
//                       <span className="amp">Quantity: {product.quantity}</span>
//                       <span className="amp">Price: ${parseFloat(product.price).toFixed(2)}</span>
//                     </div>
//                   )) || <p>No items available</p>}
//                 </div>
//                 <div className="amp grid-item price-column">
//                   ${parseFloat(orderGroup.orderDetails?.totalPrice || 0).toFixed(2)}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {orders.length === 0 && !isLoading && (
//         <h1 className="admin">No Orders Yet</h1>
//       )}
//     </>
//   );
// }

// export default AdminDashBoard;



import React, { useEffect, useState } from "react";
import "./OrderList.css";
import { useOutletContext } from "react-router-dom";

function AdminDashBoard() {
  const [setissign, dark, isdark, issign, userlogin] = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state
console.log(isLoading);

  

  useEffect(() => {
    const handleResize = () => {
      // Placeholder for resize logic if needed
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const allOrders = [];
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userMap = users.reduce((map, user) => {
      map[user.username] = user;
      return map;
    }, {});

    setUserDetails(userMap);
    const storedOrders = JSON.parse(localStorage.getItem("Orders")) || [];
    const flattenedOrders = storedOrders.flatMap((orderGroup) => {
      const username = orderGroup[1];
      const orderId = orderGroup[0];
      const orderDate = orderGroup[2];
      const orderDetails = orderGroup[3];
      return {
        username,
        orderId,
        orderDate,
        orderDetails,
      };
    });
    const filteredOrders = flattenedOrders.filter((order) =>
      userMap.hasOwnProperty(order.username)
    );
    setOrders(filteredOrders);
    setTimeout(() => {
      setIsLoading(false); // Set loading to false once orders are fetched
    }, 1000);
  }, []);

  return (
    <div className={`order-container ${dark ? "dark" : ""}`}>
      {isLoading ? (
       <div className="admin a"> <h1 >Loading Order Details...</h1></div> // Display loading message
      ) : orders.length === 0 ? (
        <div className="admin a">
          <h1>No Orders Yet</h1>
        </div>
      ) : (
        <>
          <h1 className="ordhead">Order Details</h1>
          <div className={`order-grid ${dark ? "dark" : ""}`}>
            <div className="grid-header">
              <div className="header-item amp">Username</div>
              <div className="header-item amp">User Details</div>
              <div className="header-item amp">Order Details</div>
              <div className="header-item amp">Total Price</div>
            </div>
            <div className="grid-body">
              {orders.map((orderGroup, index) => {
                const user = userDetails[orderGroup.username] || {};
                const totalOrderPrice = orderGroup.orderDetails.items.reduce(
                  (total, product) => total + product.price * product.quantity,
                  0
                );

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
                        <div key={idx} className="product-details">
                          <span className="amp">Product: {product.title}</span>
                          <span className="amp">Product ID: {product.id}</span>
                          <span className="amp">Quantity: {product.quantity}</span>
                          <span className="amp">
                            Price: ${parseFloat(product.price).toFixed(2)}
                          </span>
                        </div>
                      )) || <p>No items available</p>}
                    </div>
                    <div className="amp grid-item price-column">
                      ${parseFloat(totalOrderPrice).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashBoard;
