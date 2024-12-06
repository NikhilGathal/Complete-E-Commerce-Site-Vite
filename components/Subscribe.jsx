
import React, { useState } from 'react';
import './Subscribe.css'; // Import your custom CSS file
import { useOutletContext } from 'react-router-dom';

const Subscribe = () => {
  const [, dark] = useOutletContext(); // Dark mode context
  const [email, setEmail] = useState(''); // Email state
  const [isSubmitted, setIsSubmitted] = useState(false); // For showing submission feedback (optional)
  const [showHeading, setShowHeading] = useState(true); // State to manage the visibility of the heading
  const [errorMessage, setErrorMessage] = useState(''); // State to manage error message

  const handleSubmit = () => {

      // Hide the heading temporarily
     

    if (email.trim() === '') return; // Avoid submitting empty email

    // Retrieve existing emails from localStorage
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];

    // Check if the email already exists in the array
    if (existingEmails.includes(email)) {

      setShowHeading(false);
      // If email already exists, show an error message
      setErrorMessage('This email is already subscribed.');

      // Set a timeout to clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('') 
         setShowHeading(true)
      }  , 3000);

      setEmail('');

      return; // Do not proceed further if the email exists
    }

    // Add the new email to the array
    existingEmails.push(email);

    // Save the updated emails array to localStorage
    localStorage.setItem('emails', JSON.stringify(existingEmails));

    // Clear the input field
    setEmail('');

  

    // Optionally, set submission status
    setIsSubmitted(true);

    // Clear feedback after 2 seconds and restore the heading after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false); // Hide submission message
      setShowHeading(true);  // Show the heading again
    }, 3000); // 3 seconds delay to show the heading back
  };

  return (
    <div className={`sub ${dark ? 'dark' : ''}`}>
      <div data-aos="zoom-in" className="subscribe-section">
        <div className="container backdrop-blur-sm py-10">
          <div className="subscribe-content">
            {/* Conditionally render heading based on showHeading state */}
            {showHeading && <h1 className="subscribe-heading">Get Notified About New Products</h1>}
            {errorMessage && <h1 className="subscribe-heading"> {errorMessage}</h1>} 

{isSubmitted && <h1 className="subscribe-heading">Thank you for subscribing!</h1>} {/* Optional feedback */}

            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter your email"
              className="subscribe-input"
              value={email} // Controlled input
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
            />

            <button
              data-aos="fade-up"
              className="subscribe-button"
              onClick={handleSubmit} // Submit email
            >
              Submit
            </button>

            {/* Display the error message without the heading, similar to success message */}
         
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;


