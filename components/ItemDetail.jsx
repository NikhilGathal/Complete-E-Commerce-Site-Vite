import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import './ItemDetail.css'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../store/slices/cartSlice'
import { addWishItem } from '../store/slices/wishListSlice'
import Footer from './Footer'
import { deleteProduct } from '../store/slices/productsSlice'

const ItemDetail = () => {
  const username = localStorage.getItem('username')
  const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
  const isAdmin = username === existingAdmin.username
  const dispatch = useDispatch()
  let { productId } = useParams() // Get the itemId from the URL
  productId = +productId // Convert productId to a number
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [, dark] = useOutletContext()
  const navigate = useNavigate()
  const pdtlist = JSON.parse(localStorage.getItem('productsList'))
  // const [productCount, setProductCount] = useState(pdtlist[productId-1].rating?.count);

  const [productCount, setProductCount] = useState(0)

  useEffect(() => {
    const pdtlist = JSON.parse(localStorage.getItem('productsList')) || []
    const product = pdtlist.find((p) => p.id === productId)
    if (product) {
      setProductCount(product.rating?.count || 0)
    }
  }, [productId])


  const handleDelete = () => {
    dispatch(deleteProduct(productId))
    navigate('/Home') // Dispatch delete action
  }

  const handleUpdateProduct = () => {
    if (!item) return

    navigate(`/update-product/${productId}`, {
      state: {
        productId,
        title: item.title,
        rating: item.rating,
        price: item.price,
        imageUrl: item.image,
      },
    })
  }

  useEffect(() => {
    // Fetch item details from localStorage
    const fetchItemFromLocalStorage = () => {
      try {
        const productsList =
          JSON.parse(localStorage.getItem('productsList')) || []
        const product = productsList.find((p) => p.id === productId) // Find the product by ID

        if (!product) {
          throw new Error('Product Out of Stock')
        }
        setItem(product) // Set the product as the state
        setLoading(false) // Set loading to false
      } catch (err) {
        setError(err.message) // Handle error
        setLoading(false) // Set loading to false
      }
    }

    fetchItemFromLocalStorage()
  }, [productId])

  if (loading)
    return (
      <>
        {' '}
        <div className="error-msg">Loading...</div> <Footer dark={dark} />{' '}
      </>
    )
  if (error)
    return (
      <>
        {' '}
        <div className="error-msg"> {error}</div> <Footer dark={dark} />{' '}
      </>
    )

  return (
    <>
      <div className={`item-detail-container ${dark ? 'dark' : ''}`}>
        <div className="item-image">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="item-info">
          <h1>{item.title}</h1>
          <p className="item-price">
            ${item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}
          </p>
          <p className="item-description">{item.description}</p>
          <p className="item-category">Category: {item.category}</p>
          <div className="item-rating">
            <span>
              Rating: {item.rating.rate} / 5 ({item.rating.count} reviews)
            </span>
          </div>
          <div className="item-button os">
            {isAdmin ? (
              <>
                <button onClick={handleDelete}>Remove Product</button>

                <p
                  className="outofs"
                  style={
                    productCount === 0
                      ? { color: 'red', fontWeight: 'bold' }
                      : {}
                  }
                >
                  {productCount === 0
                    ? 'Out of Stock'
                    : `Stock: ${productCount}`}
                </p>

                <button onClick={handleUpdateProduct}>Edit Product</button>
              </>
            ) : (
              <>
                {productCount > 0 ? (
                  <button
                    onClick={() => {
                      const username = localStorage.getItem('username')
                      const cartKey = username ? `${username}cart` : 'cartItems'
                      let storedCart =
                        JSON.parse(localStorage.getItem(cartKey)) || []

                      const existingProductIndex = storedCart.findIndex(
                        (cartItem) => cartItem.productId === productId
                      )

                      if (existingProductIndex !== -1) {
                        storedCart[existingProductIndex].quantity += 1
                      } else {
                        storedCart.push({ productId, quantity: 1 })
                      }

                      localStorage.setItem(cartKey, JSON.stringify(storedCart))
                      dispatch(addCartItem({ productId }))
                      if (localStorage.getItem('username')) {
                        // updateProductCount(productId, -1) // reduce stock
                      }
                    }}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    disabled
                    style={{ backgroundColor: '#ccc', cursor: 'not-allowed' }}
                  >
                    Out of Stock
                  </button>
                )}

                <button
                  onClick={() => {
                    const username = localStorage.getItem('username')
                    const wishKey = username ? `${username}wish` : 'wishItems'
                    let storedWish =
                      JSON.parse(localStorage.getItem(wishKey)) || []

                    const existingProductIndex = storedWish.findIndex(
                      (wishItem) => wishItem.productId === productId
                    )

                    if (existingProductIndex !== -1) {
                      console.log('Product already in wishlist.')
                    } else {
                      storedWish.push({ productId, quantity: 1 })
                      localStorage.setItem(wishKey, JSON.stringify(storedWish))
                      dispatch(addWishItem({ productId }))
                    }
                  }}
                >
                  Add to Wishlist
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Footer dark={dark} /> */}
    </>
  )
}

export default ItemDetail
