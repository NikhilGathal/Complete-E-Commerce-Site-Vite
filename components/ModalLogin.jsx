import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ModalLogin.css'
import { removeallCartItem } from '../store/slices/cartSlice'
import { useDispatch } from 'react-redux'
import { removeallWishItem } from '../store/slices/wishListSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function ModalLogin({
  islog,
  setislog,
  setusername,
  setuserlogin,
  setIsAdmin,
  setissign,
  userlogin,
  setisadminlog,
}) {
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })

  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
  })

  const [isForgotPassword, setIsForgotPassword] = useState(false) // Track forgot password state

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPasswords, setShowPasswords] = useState({
    login: false,
    new: false,
    confirm: false,
  })

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    if (isForgotPassword) {
      setNewPassword((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    } else {
      setLoginData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleLogin = () => {
    if (!loginData.username.trim()) {
      alert('Username is required!')
      return
    }
    if (!loginData.password.trim()) {
      alert('Password is required!')
      return
    }
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []

    // Admin credentials
    if (
      loginData.username === existingAdmin.username &&
      loginData.password === existingAdmin.password
    ) {
      alert('Admin logged in successfully!')
      setisadminlog(true)
      localStorage.setItem('isadminlog', 'true')
      localStorage.setItem('username', loginData.username)
      // localStorage.setItem("userlogin", JSON.stringify(true));
      setusername(loginData.username)

      setIsAdmin(true) // Indicate user is an admin
      setuserlogin(true)

      setislog(false)
      navigate('/')
      setLoginData({ username: '', password: '' })
      return
    }

    // Check if login is for a regular user
    const user = existingUsers.find(
      (user) =>
        user.username === loginData.username &&
        user.password === loginData.password
    )

    if (user) {
      alert('Successfully logged in as User!')
      setusername(user.username)
      localStorage.setItem('username', user.username)
      dispatch(removeallCartItem())
      dispatch(removeallWishItem())
      setuserlogin(true)
      setIsAdmin(false) // Indicate user is a regular user
      setislog(false)
      navigate('/')
    } else {
      alert('Login failed. Username or password is incorrect.')
    }

    // Reset login data after attempt
    setLoginData({ username: '', password: '' })
  }

  const handleForgotPassword = () => {
    // Check if the username field is empty
    if (!loginData.username.trim()) {
      alert('Please enter a valid username to reset the password.')
      return // Prevent further execution if the username is empty
    }
    // Check if the username matches an existing user or admin
    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    if (loginData.username === existingAdmin.username) {
      setIsForgotPassword(true) // Proceed to reset password for admin
      return
    }

    const user = existingUsers.find(
      (user) => user.username === loginData.username
    )
    if (!user) {
      alert('Username does not exist!')
      setLoginData({ username: '', password: '' }) // Show alert if username is not found
      return
    }

    setIsForgotPassword(true) // Proceed to reset password for regular user
  }

  const handleSaveNewPassword = () => {
    // Check if any password field is empty
    if (!newPassword.password.trim() || !newPassword.confirmPassword.trim()) {
      alert('Please enter valid password in both fields.')
      return // Prevent further execution if any password field is empty
    }

    // Check if both passwords match
    if (newPassword.password !== newPassword.confirmPassword) {
      alert('Both passwords should match!')
      setNewPassword({ password: '', confirmPassword: '' })
      return // Prevent further execution if passwords do not match
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || []
    const userIndex = existingUsers.findIndex(
      (user) => user.username === loginData.username
    )

    if (userIndex >= 0) {
      existingUsers[userIndex].password = newPassword.password
      localStorage.setItem('users', JSON.stringify(existingUsers))
      alert('Password reset successfully!')
      setIsForgotPassword(false) // Hide reset fields after successful reset
      setLoginData({ username: '', password: '' })
      setNewPassword({ password: '', confirmPassword: '' })
    } else {
      const updatedAdmin = { ...existingAdmin, password: newPassword.password }
      localStorage.setItem('Admin', JSON.stringify(updatedAdmin))
      alert('Admin password reset successfully!')
      setLoginData({ username: '', password: '' })
      setIsForgotPassword(false) // Hide reset fields after successful reset
      setNewPassword({ password: '', confirmPassword: '' })
    }
  }

  const m = () => {
    setislog(false)
    setIsForgotPassword(false)
  }

  useEffect(() => {
    localStorage.setItem('userlogin', JSON.stringify(userlogin))
  }, [userlogin])

  return createPortal(
    <div onClick={m} className={`modal-overlay-log ${islog ? '' : 'hidden'}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal-box-log">
        <div className="modal-heading">
          {isForgotPassword ? 'Reset Password' : 'LogIn'}
        </div>
        <div className="modal-form">
          {isForgotPassword ? (
            <>
              <input
                placeholder="Enter New Password"
                className="modal-input"
                type={showPasswords.new ? 'text' : 'password'}
                name="password"
                value={newPassword.password}
                onChange={handleChange}
              />
              <span
                onClick={() => togglePassword('new')}
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '40px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <i
                  className={`fa-solid ${
                    showPasswords.new ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </span>
              <input
                placeholder="Re-Enter New Password"
                className="modal-input"
                type={showPasswords.confirm ? 'text' : 'password'}
                name="confirmPassword"
                value={newPassword.confirmPassword}
                onChange={handleChange}
              />
              <span
                onClick={() => togglePassword('confirm')}
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '96px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <i
                  className={`fa-solid ${
                    showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </span>
            </>
          ) : (
            <>
              <input
                placeholder="Username"
                className="modal-input"
                type="text"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />
              {/* <p className='err-ms'>Username is needed</p> */}
              <input
                placeholder="Password"
                className="modal-input"
                type={showPasswords.login ? 'text' : 'password'}
                name="password"
                value={loginData.password}
                onChange={handleChange}
              />

              <span
                onClick={() => togglePassword('login')}
                style={{
                  position: 'absolute',
                  right: '30px',
                  top: '96px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <i
                  className={`fa-solid ${
                    showPasswords.login ? 'fa-eye-slash' : 'fa-eye'
                  }`}
                ></i>
              </span>

              {/* <p className='err-msp'>Password is needed</p> */}
              <div className="already">
               
                <p>If you dont have Account ?</p>
                <h1
                  onClick={(e) => {
                    console.log('clicked')
                    setissign(true)
                    setislog(false)
                  }}
                  className=".H"
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  Sign In
                </h1>
              </div>
            </>
          )}
        </div>

        <div className="modal1-buttons">
          {isForgotPassword ? (
            <button onClick={handleSaveNewPassword} className="forgot-button">
              Save
            </button>
          ) : (
            <>
              <button onClick={handleLogin} className="login1-button">
                LogIn
              </button>
              <button
                onClick={() => setislog(false)}
                className="cancel1-button"
              >
                Cancel
              </button>

              <button onClick={handleForgotPassword} className="forgot-button">
                Forgot Password
              </button>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
