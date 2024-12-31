// import React, { useEffect, useState } from "react";
// import "./OrderList.css";
// import { useOutletContext } from "react-router-dom";

// function AdminDashBoard() {
//   const [setissign, dark, isdark, issign, userlogin] = useOutletContext();
//   const [orders, setOrders] = useState([]);
//   const [userDetails, setUserDetails] = useState({});
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 600);
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

//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i);
//       if (key && key.endsWith("orders")) {
//         const userOrders = JSON.parse(localStorage.getItem(key));
//         if (Array.isArray(userOrders) && userOrders.length > 0) {
//           userOrders.forEach((orderGroup) => {
//             allOrders.push({
//               username: key.replace("orders", ""),
//               order: orderGroup,
//             });
//           });
//         }
//       }
//     }

//     setIsLoading(false);
//     setOrders(allOrders);
//   }, []);

//   return (
//     <>
//       <div className={`order-grid ${dark ? "dark" : ""}`}>
//         {orders.length > 0 && (
//           <div className="grid-header">
//             <div className="header-item">Username</div>
//             <div className="header-item">User Details</div>
//             <div className="header-item">Order Details</div>
//             <div className="header-item">Total Price</div>
//           </div>
//         )}
//         <div className="grid-body">
//           {orders.map((orderGroup, index) => {
//             const user = userDetails[orderGroup.username] || {};
//             const totalOrderPrice = orderGroup.order.reduce(
//               (total, product) => total + product.price * product.quantity,
//               0
//             );

//             return (
//               <div key={index} className="grid-row">
//                 <div className="grid-item username-column">
//                   {orderGroup.username}
//                 </div>
//                 <div className="grid-item user-details-column">
//                   {user.email ? (
//                     <div>
//                       <p>Email: {user.email}</p>
//                       <p>Phone: {user.phone}</p>
//                       <p>Address: {user.address}</p>
//                     </div>
//                   ) : (
//                     <p>No user details available</p>
//                   )}
//                 </div>
//                 <div className="grid-item order-details-column">
//                   {orderGroup.order.map((product, idx) => (
//                     <div key={idx} className="product-details">
//                       <p>Product ID: {product.id}</p>
//                       <p>Title: {product.title}</p>
//                       <p>Quantity: {product.quantity}</p>
//                       <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid-item price-column">
//                   ${totalOrderPrice.toFixed(2)}
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 600);
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

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.endsWith("orders")) {
        const userOrders = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(userOrders) && userOrders.length > 0) {
          userOrders.forEach((orderGroup) => {
            allOrders.push({
              username: key.replace("orders", ""),
              order: orderGroup,
            });
          });
        }
      }
    }

    setIsLoading(false);
    setOrders(allOrders);
  }, []);

  return (
    <>

   <div className={`order-grid ${dark ? "dark" : ""}`}>
        {orders.length > 0 && (
          <div className="grid-header">
            <div className="header-item amp">Username</div>
            <div className="header-item amp">User Details</div>
            <div className="header-item amp">Order Details</div>
            <div className="header-item amp">Total Price</div>
          </div>
        )}


        <div className="grid-body">
          {orders.map((orderGroup, index) => {
            const user = userDetails[orderGroup.username] || {};
            const totalOrderPrice = orderGroup.order.reduce(
              (total, product) => total + product.price * product.quantity,
              0
            );

            // const gridColumnStyle = isMobile ? { gridColumn: index + 2 } : {};

            return (
              <div key={index} className="grid-row">
                <div
                  // style={gridColumnStyle}
                  className="amp grid-item username-column"
                >
                  {orderGroup.username}
                </div>
                <div
                  // style={gridColumnStyle}
                  className="grid-item user-details-column"
                >
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
                <div
                  // style={gridColumnStyle}
                  className="grid-item order-details-column"
                >
                  {orderGroup.order.map((product, idx) => (
                    <div key={idx} className="product-details">
                      <p className="amp">Product ID: {product.id}</p>
                      <p className="amp">Title: {product.title}</p>
                      <p className="amp">Quantity: {product.quantity}</p>
                      <p className="amp">Price: ${parseFloat(product.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div
                  // style={gridColumnStyle}
                  className="amp grid-item price-column"
                >
                  ${totalOrderPrice.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {orders.length === 0 && !isLoading && (
        <h1 className="admin">No Orders Yet</h1>
      )}
    </>
  );
}

export default AdminDashBoard;






















