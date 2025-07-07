import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import './ModalSign.css'
import { Link } from 'react-router-dom'

export default function ModalSign({ issign, setissign, setsignname,  setislog ,toggleMenu }) {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    address: '',
    isAdmin: false, // New state for checking admin
  })

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Handle checkbox change for Admin selection
  const handleAdminChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      isAdmin: e.target.checked,
    }))
  }

  const handleSignIn = () => {
    const errorMessages = []

    // Validate fields and add error messages to the array
    if (!userData.username.trim()) errorMessages.push('Username is required.')
    if (!userData.password.trim()) errorMessages.push('Password is required.')
    if (!userData.phone.trim()) errorMessages.push('Phone number is required.')
    if (!userData.email.trim()) errorMessages.push('Email is required.')
    if (!userData.address.trim()) errorMessages.push('Address is required.')

    // If there are any error messages, show them in an alert box
    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'))
      return // Stop further execution if there are errors
    }

    // Get existing users and admin from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    const adminData = JSON.parse(localStorage.getItem('Admin')) || null

    // Check if username or email already exists in users array
    const userExists = existingUsers.some(
      (user) =>
        user.username === userData.username || user.email === userData.email
    )

    // Check if username or email already exists in admin object
    const adminExists =
      adminData &&
      (adminData.username === userData.username ||
        adminData.email === userData.email)

    // If username or email is found in either users or admin, show an alert
    if (userExists || adminExists) {
      alert(
        'Username or email already exists. Please choose a different username or email.'
      )
      return
    }

    // Check if user is signing up as admin
    if (userData.isAdmin) {
      if (adminData) {
        alert('Admin account already exists!')
        return
      }

      // Save admin details under "Admin" key in localStorage
      localStorage.setItem('Admin', JSON.stringify(userData))
      alert('Admin sign-up successful!')
      setsignname(true)
      setissign(false)
      resetForm()
      return
    }

    // Add the new user to the array
    existingUsers.push(userData)

    // Save the updated user array to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers))
    localStorage.setItem('signedUp', 'true')

const existingEmails = JSON.parse(localStorage.getItem('emails')) || []
if (!existingEmails.includes(userData.email)) {
  existingEmails.push(userData.email)
  localStorage.setItem('emails', JSON.stringify(existingEmails))
}


    alert('Sign Up successful! Please proceed to login.')
    setsignname(true)
    setissign(false)

    // Reset form data
    resetForm()
  }

  // Function to reset the form
  const resetForm = () => {
    setUserData({
      username: '',
      password: '',
      phone: '',
      email: '',
      address: '',
      isAdmin: false,
    })
  }

  return createPortal(
    <div
      onClick={() => setissign(false)}
      className={`modal-overlay ${issign ? '' : 'hidden'}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal-box">
        <div className="modal-heading">Sign Up</div>
        <div className="modal-form">
          <input
            placeholder="Username"
            className="modal-input"
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            className="modal-input"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <input
            placeholder="Phone no"
            className="modal-input"
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <input
            placeholder="Email"
            className="modal-input"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <textarea
            placeholder="Address"
            className="modal-input"
            name="address"
            value={userData.address}
            onChange={handleChange}
          />

          {/* Admin checkbox */}
          <div className="signup-role-container">
            <input
              className="check"
              type="checkbox"
              name="isAdmin"
              checked={userData.isAdmin}
              onChange={handleAdminChange}
            />
            <label>Sign up as Admin</label>
            
          </div>
          <div className='already'>
            {' '}
            <p>If you have Account ?</p>
            <Link><h1 
           onClick={(e) => {
            console.log("clicked");
            setissign(false)
            setislog(true)
          }}
            className='.H'>Login</h1></Link>
          </div>
        </div>
        <div className="modal-buttons">
         
          <button onClick={() => setissign(false)} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleSignIn} className="signin-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
