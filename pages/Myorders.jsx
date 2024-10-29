import React, { useEffect, useState } from 'react'
import Myordersitem from '../components/Myordersitem'

function Myorders() {

    const [isLoading1, setIsLoading1] = useState(true);
    const username = localStorage.getItem('username')
    // console.log(`${username}orders`);
    
    const Myorders = JSON.parse(localStorage.getItem(`${username}orders`)) || []
    // console.log(Myorders);
    
    useEffect(() => {
        // Simulate data fetching (if you're getting cart items from an API/localStorage, etc.)
        const fetchCartItems = async () => {
          // Simulate async action (like fetching from Redux store or localStorage)
          await new Promise((resolve) => setTimeout(resolve, 300));
          setIsLoading1(false);
        };
        fetchCartItems();
      }, []);


  return (
    <>

    {
      isLoading1 ? ( <h1 style={{ textAlign: 'center' }}>Loading Ordered items...</h1>):
      Myorders.length ? (<main className="cart-container">
        <div className="cart-container"> 
        <h2 className='item-wish'>Ordered Items</h2>
        <div className="cart-items-container">
          <div className="cart-header cart-item-container">
            <div className="cart-item">Item</div>
            <div className="">Price</div>
            {/* <div className="quantity">Remove</div> */}
            <div className="total"></div>
          </div>
          {Myorders.map(({ id, title, rating, price, image, quantity }) => (
            <Myordersitem
              productId={id}
              key={id}
              title={title}
              price={price}
              quantity={quantity}
              imageUrl={image}
              rating={rating.rate}
            />
          ))}
          <div className="cart-header cart-item-container">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        </div>
      </main> ) : <div> <h1 className='empty-wish'> Not Ordered Yet </h1> </div>}
    </>

  ) 

}

export default Myorders