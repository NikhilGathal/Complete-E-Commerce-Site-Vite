import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
  const [, dark, , , , uname1, setUsername] = useOutletContext()

  const username = localStorage.getItem('username')

  useEffect(() => {
    if (!username) {
      navigate('/') // redirect if not logged in
    }
  }, [username])
       if (!username) {
    return null // Don't render anything until redirect is done
  }
  const [newUsername, setNewUsername] = useState(username)
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    address: '',
    isAdmin: false,
  })

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('Admin'))
    const users = JSON.parse(localStorage.getItem('users')) || []

    if (username) {
      if (adminData && username === adminData.username) {
        setUserData(adminData)
      } else {
        const user = users.find((user) => user.username === username)
        if (user) {
          setUserData(user)
        }
      }
    }
    //  else {
    //   navigate("/Home");
    // }
  }, [username, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('users')) || []
    const adminData = JSON.parse(localStorage.getItem('Admin')) || null

    // Check if new username or email already exists in users (excluding current user)
    const isUsernameTaken = users.some(
      (user) =>
        user.username === userData.username && user.username !== username
    )
    console.log(isUsernameTaken)

    const isEmailTaken = users.some(
      (user) => user.email === userData.email && user.username !== username
    )
    console.log(isEmailTaken)

    // Check if new username or email already exists in Admin
    const isUsernameTakenByAdmin =
      adminData?.username === userData.username &&
      username !== adminData.username
    const isEmailTakenByAdmin =
      adminData?.email === userData.email && username !== adminData.username

    if (isUsernameTaken || isUsernameTakenByAdmin) {
      alert('Username already exists. Please choose another username.')
      return
    }
    if (isEmailTaken || isEmailTakenByAdmin) {
      alert('Email already exists. Please choose another email.')
      return
    }

    const updatedUser = { ...userData }

    if (username !== userData.username) {
      const oldUsername = username

      // Update orders, wishlist, and cart keys in localStorage
      const ordersKey = `${oldUsername}orders`
      const wishKey = `${oldUsername}wish`
      const cartKey = `${oldUsername}cart`

      const orders = JSON.parse(localStorage.getItem(ordersKey))
      if (orders) {
        localStorage.removeItem(ordersKey)
        localStorage.setItem(
          `${userData.username}orders`,
          JSON.stringify(orders)
        )
      }

      const wish = JSON.parse(localStorage.getItem(wishKey))
      if (wish) {
        localStorage.removeItem(wishKey)
        localStorage.setItem(`${userData.username}wish`, JSON.stringify(wish))
      }

      const cart = JSON.parse(localStorage.getItem(cartKey))
      if (cart) {
        localStorage.removeItem(cartKey)
        localStorage.setItem(`${userData.username}cart`, JSON.stringify(cart))
      }

      localStorage.setItem('username', userData.username)
    }

    // If updating the admin data
    if (adminData && username === adminData.username) {
      localStorage.setItem('Admin', JSON.stringify(updatedUser))
    } else {
      const updatedUsers = users.map((storedUser) =>
        storedUser.username === username ? updatedUser : storedUser
      )
      localStorage.setItem('users', JSON.stringify(updatedUsers))
    }

    if (uname1 !== userData.username) {
      setUsername(userData.username)
    }

    alert('Profile updated successfully!')
    navigate('/')
  }

  return (
    <div className="editu">
      <div className={`edit-user-modal ${dark ? 'dark' : ''}`}>
        <div className="edit-user-modal-content">
          <h2>Edit Profile</h2>
          <div className="edit-form">
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={userData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button onClick={handleSave} className="save-button">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
