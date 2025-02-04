import React, { useState } from 'react'
import './Subscribe.css' // Import your custom CSS file
import { useOutletContext } from 'react-router-dom'

const Subscribe = ({ id }) => {
  const [, dark] = useOutletContext() // Dark mode context
  const [email, setEmail] = useState('') // Email state
  const [isSubmitted, setIsSubmitted] = useState(false) // For showing submission feedback (optional)
  const [showHeading, setShowHeading] = useState(true) // State to manage the visibility of the heading
  const [errorMessage, setErrorMessage] = useState('') // State to manage error message
  const [emailValidationError, setEmailValidationError] = useState('') // State for email validation error

  // Email validation regex pattern (simple version)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const handleSubmit = () => {
    // Validate email format
    if (!emailRegex.test(email)) {
      setShowHeading(false)
      setEmailValidationError('Please enter a valid email address.')
      setTimeout(() => {
        setEmailValidationError('')
        setShowHeading(true)
      }, 3000)
      setEmail('')
      return
    } else {
      setEmailValidationError('') // Clear validation error if email is valid
    }
    // Retrieve existing emails from localStorage
    const existingEmails = JSON.parse(localStorage.getItem('emails')) || []
    // Check if the email already exists in the array
    if (existingEmails.includes(email)) {
      setShowHeading(false)
      // If email already exists, show an error message
      setErrorMessage('This email is already subscribed.')
      // Set a timeout to clear the error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('')
        setShowHeading(true)
      }, 3000)

      setEmail('')
      return // Do not proceed further if the email exists
    }
    // Add the new email to the array
    existingEmails.push(email)
    // Save the updated emails array to localStorage
    localStorage.setItem('emails', JSON.stringify(existingEmails))
    // Clear the input field
    setEmail('')
    setShowHeading(false)
    // Optionally, set submission status
    setIsSubmitted(true)
    // Clear feedback after 2 seconds and restore the heading after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false) // Hide submission message
      setShowHeading(true) // Show the heading again
    }, 3000) // 3 seconds delay to show the heading back
  }

  return (
    <div id={id} className={`sub ${dark ? 'dark' : ''}`}>
      <div data-aos="zoom-in" className="subscribe-section">
        <div className="container backdrop-blur-sm py-10">
          <div className="subscribe-content">
            {/* Conditionally render heading based on showHeading state */}
            {showHeading && (
              <h1 className="subscribe-heading">
                Get Notified About New Products
              </h1>
            )}
            {errorMessage && (
              <h1 className="subscribe-heading">{errorMessage}</h1>
            )}
            {isSubmitted && (
              <h1 className="subscribe-heading">Thank you for subscribing!</h1>
            )}{' '}
            {/* Optional feedback */}
            {emailValidationError && (
              <h1 className="subscribe-heading">{emailValidationError}</h1>
            )}{' '}
            {/* Show validation error */}
            <input
              data-aos="fade-up"
              type="email"
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
