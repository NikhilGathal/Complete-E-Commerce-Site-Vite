import React, { useEffect, useState } from 'react'
import { productsList } from '../store/productsList'
import { FaStar } from 'react-icons/fa'
import './TopProducts.css'
import { Link, useOutletContext } from 'react-router-dom'
import AOS from 'aos' // Import AOS
import c from '../assets/3.jpg'
import g from '../assets/7.jpg'
import t from '../assets/20.jpg' // ✅ Will rerun if username changes
const ProductsData = [
  {
    id: 3,
    image: c,
    title: 'Mens Cotton Jacket',
    description:
      'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions...',
    price: '55.99',
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 7,
    image: g,
    title: 'White Gold Plated Princess',
    description:
      'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her...',
    price: '9.99',
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 20,
    image: t,
    title: 'DANVOUY Womens T Shirt Casual Cotton Short',
    description:
      '95% Cotton, 5% Spandex. Features: Casual, Short Sleeve, Letter Print, V-Neck...',
    price: '12.99',
    rating: {
      rate: 3.6,
      count: 145,
    },
  },
]

const TopProducts = ({ handleOrderPopup, id }) => {
  const [selectedProducts, setSelectedProducts] = useState(ProductsData)

  const username = localStorage.getItem('username')
  const [isAdmin, setIsAdmin] = useState(false) // ✅ Track admin in state

  useEffect(() => {
    const existingAdmin = JSON.parse(localStorage.getItem('Admin')) || {}
    setIsAdmin(username === existingAdmin.username) // ✅ update state
  }, [username])

  const [, dark] = useOutletContext()

  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init() // Initialize AOS
    return () => {
      AOS.refresh() // Refresh AOS when the component unmounts
    }
  }, [])

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem('topProductList')) || null

     const temp = JSON.parse(localStorage.getItem('productsList')) || [...productsList]

   if (localData && localData.length > 0) {
  const ordered = localData
    .map((id) => temp.find((p) => p.id === id))
    .filter(Boolean) // remove null if id not found
  setSelectedProducts(ordered)
}

  }, [])

  return (
    <div id={id} className={`tp ${dark ? 'dark' : ''}`}>
      <div className="container">
        {/* Header section */}
        <div className="text-left mb-24">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Rated Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Best Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Discover our top-rated products, carefully selected for quality and
            style...
          </p>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {selectedProducts.map((data) => (
            <div data-aos="zoom-in" className="product-card" key={data.id}>
              {/* image section */}
              <div className="image-section">
                <Link to={`/${data.id}`}>
                  <img src={data.image} alt={data.title} className="image" />
                </Link>
              </div>
              {/* details section */}
              <div className="details-section">
                {/* star rating */}
                <div className="rating">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <Link to={`/${data.id}`}>
                  <button onClick={handleOrderPopup}>
                    {isAdmin ? 'View Product' : 'Order Now'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopProducts
