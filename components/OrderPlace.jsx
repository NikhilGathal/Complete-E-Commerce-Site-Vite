import React from 'react'
import { Link } from 'react-router-dom'

function OrderPlace() {
  return (
   <>
     
     <div className='opp'> 
     <div className='op'>
      <div className='orderplace'>Order Placed Successfully</div>
      <div className='button-wrapper'>
        <Link to="/">
          <button className='continue'>Continue Shopping</button>
        </Link>
      </div>
      </div>
     </div>
    
   </>
    
  )
}

export default OrderPlace