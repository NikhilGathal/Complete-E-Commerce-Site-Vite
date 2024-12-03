

import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import './ModalSign.css'

export default function ModalSign({ issign, setissign, setsignname }) {
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

  // Handle Sign Up (Save to localStorage)


  const handleSignIn = () => {
    const errorMessages = [];
  
    // Validate fields and add error messages to the array
    if (!userData.username.trim()) errorMessages.push('Username is required.');
    if (!userData.password.trim()) errorMessages.push('Password is required.');
    if (!userData.phone.trim()) errorMessages.push('Phone number is required.');
    if (!userData.email.trim()) errorMessages.push('Email is required.');
    if (!userData.address.trim()) errorMessages.push('Address is required.');
  
    // If there are any error messages, show them in an alert box
    if (errorMessages.length > 0) {
      alert(errorMessages.join('\n'));
      return; // Stop further execution if there are errors
    }
  
    // Check if user is signing up as admin
    if (userData.isAdmin) {
      const existingAdmin = localStorage.getItem('Admin');
      if (existingAdmin) {
        alert('Admin account already exists!');
        return;
      }
  
      // Save admin details under "Admin" key in localStorage
      localStorage.setItem('Admin', JSON.stringify(userData));
      alert('Admin sign-up successful!');
      setsignname(true);
      setissign(false);
      resetForm();
      return;
    }
  
    // Get existing users from localStorage or initialize an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  
    // Check if the username or email already exists
    const userExists = existingUsers.some(
      (user) => user.username === userData.username || user.email === userData.email
    );
  
    if (userExists) {
      alert('User already exists. Please choose a different username or email.');
      return;
    }
  
    // Add the new user to the array
    existingUsers.push(userData);
  
    // Save the updated user array to localStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('signedUp', 'true');
    alert('Sign Up successful! Please proceed to login.');
    setsignname(true);
    setissign(false);
  
    // Reset form data
    resetForm();
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
            className='check'
              type="checkbox"
              name="isAdmin"
              checked={userData.isAdmin}
              onChange={handleAdminChange}
            />
            <label>Sign up as Admin</label>
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
