import { useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './EditUser.css'

const EditUser = () => {
  const navigate = useNavigate()
//   const [, dark] = useOutletContext()
  const [, dark, , , ,uname1 , setUsername] = useOutletContext();
  //   const [, , , , , username, setUsername] = useOutletContext()

  // Fetch username from localStorage
  const username = localStorage.getItem('username')
  const [newUsername, setNewUsername] = useState(username)
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    phone: '',
    email: '',
    address: '',
    isAdmin: false,
  })

  // useEffect(() => {
  //   // If the user is logged in and username exists in localStorage, fetch the user data

  //   if (username ) {
  //     const users = JSON.parse(localStorage.getItem('users')) || []
      
  //     const user = users.find((user) => user.username === username)
  //     if (user) {
  //       setUserData({
  //         username: user.username,
  //         password: user.password,
  //         phone: user.phone,
  //         email: user.email,
  //         address: user.address,
  //         isAdmin: user.isAdmin,
  //       })
  //     }
  //   } else {
  //     navigate('/Home') // Redirect to login if no username found
  //   }
  // }, [username, navigate])

  useEffect(() => {
    // Fetch admin data from localStorage once, so it can be used later for comparison
    const adminData = JSON.parse(localStorage.getItem('Admin'));
  
    // If the user is logged in and username exists in localStorage, fetch the user data
    if (username) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
  
      if (adminData && username === adminData.username) {
        // If the logged-in user is the admin, use the admin data
        setUserData({
          username: adminData.username,
          password: adminData.password,
          phone: adminData.phone,
          email: adminData.email,
          address: adminData.address,
          isAdmin: adminData.isAdmin,
        });
      } else {
        // For regular users, fetch their data from the users array
        const user = users.find((user) => user.username === username);
        if (user) {
          setUserData({
            username: user.username,
            password: user.password,
            phone: user.phone,
            email: user.email,
            address: user.address,
            isAdmin: user.isAdmin,
          });
        }
      }
    } else {
      navigate('/Home'); // Redirect to login if no username found
    }
  }, [username, navigate]);
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleAdminChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      isAdmin: e.target.checked,
    }))
  }

//   const handleSave = () => {
//     // Validate fields
//     const errorMessages = []
//     if (!userData.username.trim()) errorMessages.push('Username is required.')
//     if (!userData.password.trim()) errorMessages.push('Password is required.')
//     if (!userData.phone.trim()) errorMessages.push('Phone number is required.')
//     if (!userData.email.trim()) errorMessages.push('Email is required.')
//     if (!userData.address.trim()) errorMessages.push('Address is required.')

//     if (errorMessages.length > 0) {
//       alert(errorMessages.join('\n'))
//       return
//     }

//     // Fetch the existing users from localStorage
//     const users = JSON.parse(localStorage.getItem('users')) || []

//     // Update the user in localStorage
//     const updatedUser = { ...userData }
//     if (username !== userData.username) {
//       const oldUsername = username;
    
//       // Check and update each key only if it exists in localStorage
//       const ordersKey = `${oldUsername}orders`;
//       const wishKey = `${oldUsername}wish`;
//       const cartKey = `${oldUsername}cart`;
    
//       // Handle orders
//       const orders = JSON.parse(localStorage.getItem(ordersKey));
//       if (orders) {
//         localStorage.removeItem(ordersKey);
//         localStorage.setItem(`${userData.username}orders`, JSON.stringify(orders));
//       }
    
//       // Handle wishlist
//       const wish = JSON.parse(localStorage.getItem(wishKey));
//       if (wish) {
//         localStorage.removeItem(wishKey);
//         localStorage.setItem(`${userData.username}wish`, JSON.stringify(wish));
//       }
    
//       // Handle cart
//       const cart = JSON.parse(localStorage.getItem(cartKey));
//       if (cart) {
//         localStorage.removeItem(cartKey);
//         localStorage.setItem(`${userData.username}cart`, JSON.stringify(cart));
//       }
    
//       // Update the username in localStorage
//       localStorage.setItem('username', userData.username);
//     }
//     // Update the user list in localStorage
//     const updatedUsers = users.map((storedUser) =>
//       storedUser.username === username ? updatedUser : storedUser
//     )

//     // Save updated users list to localStorage
//     localStorage.setItem('users', JSON.stringify(updatedUsers))
//     localStorage.setItem('username', userData.username); // Update the logged-in username in localStorage
   
   
//     // if (username !== userData.username) {
//     //   console.log('Updating username:', userData.username);
//     //     setUsername(userData.username); // Update the username in the global state
//     //   }

//     console.log('Current uname1:', uname1);
// console.log('Updating username:', userData.username);

// if (uname1 !== userData.username) {
//   console.log('State will be updated');
//   setUsername(userData.username);
// } else {
//   console.log('State is not updated because values are the same');
// }
//     alert('Profile updated successfully!')
//     navigate('/Home') // Redirect after saving the data
//   }


const handleSave = () => {
  // Validate fields
  const errorMessages = []
  if (!userData.username.trim()) errorMessages.push('Username is required.')
  if (!userData.password.trim()) errorMessages.push('Password is required.')
  if (!userData.phone.trim()) errorMessages.push('Phone number is required.')
  if (!userData.email.trim()) errorMessages.push('Email is required.')
  if (!userData.address.trim()) errorMessages.push('Address is required.')

  if (errorMessages.length > 0) {
    alert(errorMessages.join('\n'))
    return
  }

  // Fetch the existing users and admin data from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || []
  const adminData = JSON.parse(localStorage.getItem('Admin')) || null

  const updatedUser = { ...userData }

  if (username !== userData.username) {
    const oldUsername = username
    
    // Update orders, wishlist, and cart for both users and admin
    const ordersKey = `${oldUsername}orders`
    const wishKey = `${oldUsername}wish`
    const cartKey = `${oldUsername}cart`

    const orders = JSON.parse(localStorage.getItem(ordersKey))
    if (orders) {
      localStorage.removeItem(ordersKey)
      localStorage.setItem(`${userData.username}orders`, JSON.stringify(orders))
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

    // Update the username in localStorage
    localStorage.setItem('username', userData.username)
  }

  // If updating the admin data
  if (adminData && username === adminData.username) {
    // Update admin data directly
    localStorage.setItem('Admin', JSON.stringify(updatedUser))
  } else {
    // Update the user list in localStorage for regular users
    const updatedUsers = users.map((storedUser) =>
      storedUser.username === username ? updatedUser : storedUser
    )

    // Save updated users list to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  // Update the logged-in username in localStorage
  localStorage.setItem('username', userData.username)

  // Update global state (if necessary)
  if (uname1 !== userData.username) {
    setUsername(userData.username)
  }

  alert('Profile updated successfully!')
  navigate('/Home') // Redirect after saving the data
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
