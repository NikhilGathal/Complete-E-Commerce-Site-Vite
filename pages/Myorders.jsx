

import React from 'react';
import Myordersitem from '../components/Myordersitem';

function Myorders() {
  const username = localStorage.getItem('username');
  const Myorders = JSON.parse(localStorage.getItem(`${username}orders`)) || [];

  return (
    <>
      {Myorders.length ? (
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
      ) : (
        <div className="empty-wish-container">
          <h1 className="empty-wish">No Orders Yet</h1>
        </div>
      )}
    </>
  );
}

export default Myorders;
