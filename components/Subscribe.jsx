


import React, { useState } from 'react';
import './Subscribe.css'; // Import your custom CSS file
import { useOutletContext } from 'react-router-dom';

const Subscribe = () => {
  const [, dark] = useOutletContext(); // Dark mode context
  const [email, setEmail] = useState(''); // Email state
  const [isSubmitted, setIsSubmitted] = useState(false); // For showing submission feedback (optional)

  const handleSubmit = () => {
    if (email.trim() === '') return; // Avoid submitting empty email

    // Retrieve existing emails from localStorage
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || [];

    // Add the new email to the array
    existingEmails.push(email);

    // Save the updated emails array to localStorage
    localStorage.setItem('emails', JSON.stringify(existingEmails));

    // Clear the input field
    setEmail('');

    // Optionally, set submission status
    setIsSubmitted(true);

    // Clear feedback after a few seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className={`sub ${dark ? 'dark' : ''}`}>
      <div data-aos="zoom-in" className="subscribe-section">
        <div className="container backdrop-blur-sm py-10">
          <div className="subscribe-content">
            <h1 className="subscribe-heading">Get Notified About New Products</h1>
            
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
            
            {isSubmitted && <p className="success-message">Thank you for subscribing!</p>} {/* Optional feedback */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
