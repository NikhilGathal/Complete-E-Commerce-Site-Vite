import React, { useEffect, useState } from 'react'
import wishIcon from '../assets/heart-solid.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import CartIcon from '../assets/cart-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProductdata,
  updateAllProducts,
} from '../store/slices/productsSlice'
import { loadCartItemsFromLocal } from '../store/slices/cartSlice'
import ModalSign from './ModalSign'
import ModalLogin from './ModalLogin'
import { loadWishItem } from '../store/slices/wishListSlice'
import Hamburger from './Hamburger'
import './Hover.css'
import lightmode from '../assets/light-mode-button.png'
import darkmode from '../assets/dark-mode-button.png'
// import SuggestionBox from './SuggestionBox'
export default function Header({
  issign,
  setissign,
  dark,
  isdark,
  setuserlogin,
  uname1,
}) {
  console.log(uname1);
  
  const [signname, setsignname] = useState(false)
  const [islog, setislog] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigate = useNavigate()
  // console.log(isAdmin);
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const adminUsername = existingAdmin.username // Get the username from existingAdmin

  const dispatch = useDispatch()

  const [username, setusername] = useState(() => {
    return localStorage.getItem('username') || ''
  })

  useEffect(() => {
    if (username) {
      setIsAdmin(true)
      // Fetch and load the user's cart and wishlist from localStorage when username changes (i.e., user logs in)
      const storedCart =
        JSON.parse(localStorage.getItem(`${username}cart`)) || []
      dispatch(loadCartItemsFromLocal(storedCart))

      const storedWish =
        JSON.parse(localStorage.getItem(`${username}wish`)) || []
      dispatch(loadWishItem(storedWish))
    }
  }, [username, dispatch])

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setusername(storedUsername)
      setIsAdmin(storedUsername)
    }
    const signedUp = localStorage.getItem('signedUp')
    if (signedUp === 'true') {
      setsignname(true)
    }
  }, [uname1])

  useEffect(() => {
    // dispatch(
    //   fetchdata({
    //     url: 'products',
    //     onsuccess: updateAllProducts.type,
    //      onstart: fetchProducts.type,
    //     onerror: fetchProductsError.type
    //   })
    // )

    // dispatch(fetchdata({
    //   url: 'carts/5',
    //   onsuccess: loadCartItems.type,
    //   onstart: fetchCartItems.type,
    //   onerror: fetchCartItemsError.type
    // })
    // )

    dispatch(fetchProductdata())

    // dispatch( fetchCartItemsdata())

    let userlogin = localStorage.getItem('username')
    let cartKey = userlogin ? `${userlogin}cart` : 'cartItems'
    let wishKey = userlogin ? `${userlogin}wish` : 'wishItems'

    let storedCart = JSON.parse(localStorage.getItem(cartKey)) || []
    dispatch(loadCartItemsFromLocal(storedCart))

    let storedWish = JSON.parse(localStorage.getItem(wishKey)) || []
    dispatch(loadWishItem(storedWish))

    // dispatch(fetchProducts())
    // fetch('https://fakestoreapi.com/products')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch(updateAllProducts(data))
    //   })
    //   .catch(() => {
    //     dispatch(fetchProductsError())
    //   })

    // dispatch(fetchCartItems())
    // fetch('https://fakestoreapi.com/carts/5')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch(loadCartItems(data))
    //   })
    //   .catch(() => {
    //     dispatch(fetchCartItemsError())
    //   })
  }, [])
  const cartItems = useSelector((state) => state.cartItems.list)
  // console.log(cartItems);
  const wish = useSelector((state) => state.wishList.list)
  // console.log(wish);

  const toggleMenu = (e) => {
    e.stopPropagation() // Stop the click event from propagating

    setMenuOpen((prevState) => !prevState) // Toggle the menu open state
  }

  const closeMenu = () => {
    setMenuOpen(false) // Close the menu
  }

  const handleHeaderClick = (e) => {
    // If the menu is open and the click is within the header, do not close it
    // console.log('Header');

    if (menuOpen && !e.target.closest('.header-contents')) {
      e.stopPropagation() // Prevent event bubbling
    } else {
      closeMenu() // Close the menu if clicked outside
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.header-container')) {
        closeMenu() // Close the menu if clicked outside of header
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])

  const handleClick = () => {
    if (username === adminUsername) {
      navigate('/Admin') // Navigate to the Admin page if username is Admin
    } else {
      navigate('/myorder') // Navigate to My Orders if username is not Admin
    }
  }
  // console.log(username);
  // const statedata = useSelector((state)=> state.products.list)
  // console.log(statedata);

  function handleDeleteAccount() {
    // Get the current username (you can store it in localStorage or use it from the session)
    const currentUsername = localStorage.getItem('username')

    if (currentUsername) {
      // Delete the specific keys in localStorage
      localStorage.removeItem(`${currentUsername}wish`)
      localStorage.removeItem(`${currentUsername}cart`)
      localStorage.removeItem(`${currentUsername}orders`)

      // Get the users array from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || []

      // Remove the current user from the array
      const updatedUsers = users.filter(
        (user) => user.username !== currentUsername
      )

      // Save the updated users array back to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers))

      localStorage.removeItem('username')
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || []
      const storedwish = JSON.parse(localStorage.getItem('wishItems')) || []
      dispatch(loadCartItemsFromLocal(storedCart))
      dispatch(loadWishItem(storedwish))
      setuserlogin(false)
      setusername('')
      setsignname(false)
      localStorage.setItem('signedUp', 'false')
      navigate('/')
    }
  }

  // const dark = false
  return (
    <header
      onClick={handleHeaderClick}
      className={`header-container head ${dark ? 'dark' : ''} ${
        menuOpen ? 'menu-open' : ''
      }`}
    >
      <div className="header-contents">
        <Link to="/">
          {' '}
          <h1
            title="home"
            onClick={() => {
              //  setquery('')
              // dispatch(fetchdata())
              dispatch(fetchProductdata())
              // dispatch(updateAllProducts(statedata))
              //  console.log('clicked');
            }}
            className="H"
          >
            {' '}
            Shopee{' '}
          </h1>{' '}
        </Link>
        {/* <i
          onClick={() => {
            localStorage.setItem('isdarkmode', !dark)
            isdark(!dark)
          }}
          title={`${dark ? 'light mode' : 'dark mode'}`}
          className={`mode fa-solid fa-2xl fa-${dark ? 'sun ' : 'moon '}  `}
        ></i> */}

        <img
          onClick={() => {
            localStorage.setItem('isdarkmode', !dark)
            isdark(!dark)
          }}
          title={`${dark ? 'Light mode' : 'Dark mode'}`}
          src={dark ? darkmode : lightmode}
          alt={dark ? 'Light Mode' : 'Dark Mode'}
          className="mode"
        />
<h1> {username ? `Welcome ${username}` : ''} </h1>
        <div className="icon-contain">
          <Link className="cart-icon" to="/cart">
            <img
              className={`c H ${dark ? 'dark' : ''} `}
              title="Cart"
              src={CartIcon}
              alt="cart-icon"
            />

            <div className="cart-items-count">
              {cartItems.reduce(
                (accumulator, currentItem) =>
                  accumulator + currentItem.quantity,
                0
              )}
            </div>
          </Link>
          <Link className="cart-icon" to="/wish">
            <img
              title="WishList"
              className="c heart H"
              src={wishIcon}
              alt="wish-icon"
            />
            <div className="cart-items-count">
              {wish.reduce((acc, curr) => acc + curr.quantity, 0)}
            </div>
          </Link>
        </div>

        <div onClick={(e) => e.stopPropagation()} className="ham">
          <span onClick={toggleMenu} className="close-icon">
            &times;
          </span>

          <h3
            className="H"
            onClick={(e) => {
              setissign(true)
              toggleMenu(e)
            }}
            style={{ display: signname || username ? 'none' : 'block' }}
          >
            Signup
          </h3>
          <ModalSign
            issign={issign}
            setissign={setissign}
            setsignname={setsignname}
          />

          {(username && username !== adminUsername) ||
          username === adminUsername ? (
            <div className={`heading-container ${dark ? 'dark' : ''}`}>
              {username === adminUsername ? (
                <h3 className="H heading">Profile</h3>
              ) : (
                username !== adminUsername && (
                  <h3 className="H heading">Profile</h3>
                )
              )}

              {/* Render suggestion box only if username is not 'Admin' and exists */}
              {/* {username && username !== 'Admin' && (
                <div className="suggestion-box">
                  <Link to="/myorder">
                    <p>My Orders</p>
                  </Link>
                  <Link to="/Add">
                    <p>Cart</p>
                  </Link>
                  <Link to="/wish">
                    <p>WishList</p>
                  </Link>
                  <Link to="/">
                    <p>Buy Again</p>
                  </Link>
                </div>
              )} */}

              {username && (
                <div className="suggestion-box">
                  {username === adminUsername ? (
                    <>
                      <Link to="/Admin">
                        <p>Orders</p>
                      </Link>
                      <Link to="/Add">
                        <p>Add Product</p>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/myorder">
                        <p>My Orders</p>
                      </Link>
                      <Link to="/EditUser">
                        <p>Edit Profile</p>
                      </Link>
                      <Link to="/">
                        <p onClick={handleDeleteAccount}>Delete Account</p>
                      </Link>
                      <Link to="/">
                        <p>Buy Again</p>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : null}

          <h3
            className="H login-container"
            style={{ display: username ? 'none' : 'block' }}
          >
            Login
            <div className="suggestion-box-log">
              <p
                onClick={(e) => {
                  setislog(true)
                  toggleMenu(e)
                  // console.log('hi')
                }}
              >
                Admin
              </p>
              <p
                onClick={(e) => {
                  setislog(true)
                  toggleMenu(e)
                  // console.log('hi')
                }}
              >
                User
              </p>
            </div>
          </h3>
          <ModalLogin
            islog={islog}
            setislog={setislog}
            setusername={setusername}
            setuserlogin={setuserlogin}
            setIsAdmin={setIsAdmin}
          />
          <h3
            className="H"
            onClick={() => {
              localStorage.removeItem('username')
              const storedCart =
                JSON.parse(localStorage.getItem('cartItems')) || []
              const storedwish =
                JSON.parse(localStorage.getItem('wishItems')) || []
              dispatch(loadCartItemsFromLocal(storedCart))
              dispatch(loadWishItem(storedwish))
              setuserlogin(false)
              setusername('')
              setsignname(false)
              localStorage.setItem('signedUp', 'false')
              navigate('/')
            }}
            style={{ display: username ? 'block' : 'none' }}
          >
            Logout
          </h3>
          {/* <NavLink
            style={{
              display: username ? 'inline' : 'none', // Show only if someone is logged in
            }}
            className={({ isActive }) => (isActive ? 'underline' : '')}
            to="/myorder"
          >
            <h3 className="H">
              {username === 'Admin' ? 'Orders' : 'My Orders'}
            </h3>
          </NavLink> */}

          {/* <NavLink
            style={{
              display: username ? 'inline' : 'none', // Show only if someone is logged in
            }}
            className={({ isActive }) => (isActive ? 'underline' : '')}
            to=""
          >
             </NavLink> */}

          <NavLink
            className={({ isActive }) => (isActive ? 'underline' : '')}
            to="/about"
          >
            {' '}
            <h3 className="H">About Us</h3>{' '}
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? 'underline' : '')}
            to="/contact"
          >
            {' '}
            <h3 className="H">Contact Us</h3>{' '}
          </NavLink>
        </div>
        <Hamburger toggleMenu={toggleMenu} />
      </div>
    </header>
  )
}
