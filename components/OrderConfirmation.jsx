import React from 'react';
import emailjs from 'emailjs-com';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { username, cartItems, totalPrice } = location.state;
 

  const getUserDetails = (username) => {
    // Retrieve the users array from localStorage
    const users = JSON.parse(localStorage.getItem('users'));
  
    // Check if the users array exists and is not empty
    if (users) {
      // Find the user with the matching username
      const user = users.find(u => u.username === username);
  
      // If the user is found, return their email and phone
      if (user) {
        return {
          email: user.email,
          phone: user.phone,
          address: user.address
        };
      }
    }
    return null; // Return null if user is not found
  };



  
  const sendOrderEmail = () => {
    // Get the logged-in user's details based on their username
    const userDetails = getUserDetails(username); // Assuming `username` is from the login info
  
    if (userDetails) {
      const { email, phone, address } = userDetails; // Destructure the email, phone, and address
      // console.log(address);
      
      // console.log("Sending email to:", email);
  
      // Generate ordered date and time
      const orderDate = new Date();
      const order_date = orderDate.toLocaleDateString(); // Format: MM/DD/YYYY
  
      // Generate a unique order ID
      const order_id = `OD${Date.now()}`; // Example: OD1698087039231

      const products = cartItems.map((item) => ({
        product_name: item.title,
        quantity: item.quantity,
        product_price: item.price.toFixed(2),
        total_price: (item.price * item.quantity).toFixed(2),
      }));
  
  
      // Construct the order details
      const productDetailsString = products
      .map(
        (item) =>
          `Product: ${item.product_name}\nQty: ${item.quantity}\nPrice: ₨. ${item.product_price}\nTotal Amount: ₨. ${item.total_price}\n\n`
      )
      .join(""); // Combine all product strings with line breaks
    
      const completeTotal = products
  .reduce((sum, item) => sum + parseFloat(item.total_price), 0)
  .toFixed(2);

   
  
      // Email parameters
      const emailParams = {
        username,            // User's name
        useremail: email,    // User's email
        user_phone: phone,   // User's phone
        user_address: address, // User's address
        order_date,          // Order date
        order_id,            // Order ID
        // HTML structure for the order summary
        productDetails: productDetailsString,
        totalOrderPrice: parseFloat(totalPrice || 0).toFixed(2),
        completeTotal,  // Total price of the order
      };
  
      // Send the email
      emailjs.send(
        'service_xdyg5f6', // Replace with your actual service ID
        'template_9w8s44b', // Replace with your actual template ID
        emailParams,
        'e1rMsTvTE-ncRNQc2' // Replace with your actual Public Key
      )
        .then((response) => {
          console.log('Email sent successfully', response);
        })
        .catch((error) => {
          console.error('Error sending email', error);
        });
    } else {
      console.error('User details not found');
    }
  };
  
  
  
  


  // Send the order email when the component is mounted
  React.useEffect(() => {
    sendOrderEmail();
  }, []);

  return (
    <div className='order-confirm'>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order, {username}!</p>
      <p>We have sent the order details to your email.</p>
    </div>
  );
};

export default OrderConfirmation;
