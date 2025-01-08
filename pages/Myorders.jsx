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




















import React, { useEffect, useState } from "react";
import Myordersitem from "../components/Myordersitem";

function Myorders() {
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");

  // Get the orders from localStorage
  const rawOrders = JSON.parse(localStorage.getItem(`${username}orders`)) || [];

  // Flatten the nested structure and extract product details
  const Myorders = rawOrders.flatMap((order) => order.slice(1)); // Skip the first element (order ID)

  useEffect(() => {
    const simulateLoading = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); // Simulate API fetch delay
    };
    simulateLoading();
  }, []);

  return (
    <div className={`order-container`}>
      {isLoading ? (
        <div className="admin">
          <h1>Loading Order Details...</h1>
        </div>
      ) : Myorders.length === 0 ? (
        <div className="admin">
          <h1>No Orders Yet</h1>
        </div>
      ) : (
        <main className="cart-container">
          <div className="cart-container">
            <h2 className="item-wish">My Orders</h2>
            <div className="cart-items-container">
              <div className="cart-header cart-item-container">
                <div className="cart-item">Item</div>
                <div>Price</div>
                <div className="total"></div>
              </div>
              {Myorders.map(({ id, title, rating, price, image, quantity }, index) => (
                <Myordersitem
                  productId={id}
                  key={`${id}-${index}`}
                  title={title}
                  price={price}
                  quantity={quantity}
                  imageUrl={image}
                  rating={rating.rate}
                  index={index}
                />
              ))}
              <div className="cart-header cart-item-container">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default Myorders;
