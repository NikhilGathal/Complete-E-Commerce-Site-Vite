import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../store/slices/productsSlice'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './AddNewProduct.css'

const AddNewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [, dark] = useOutletContext()

  // Accessing the current state of products from the Redux store
  const products = useSelector((state) => state.products.list)

  // Initialize the state for all fields
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(1)
  const [newCount, setNewCount] = useState(1)

  // Calculate productId based on the current state
  // const calculateProductId = () => {
  //   // Generate the next ID by getting the length of the existing products list
  //   return products.length + 1
  // }

  const isAdminLog = localStorage.getItem('isadminlog') === 'true'
  useEffect(() => {
    if (!isAdminLog) {
      navigate('/')
    }
  }, [isAdminLog])

  if (!isAdminLog) {
    return null // ✅ Prevents rendering if admin is not logged in
  }

  const calculateProductId = () => {
    if (products.length === 0) return 1
    const lastProduct = products[products.length - 1]
    return lastProduct?.id ? lastProduct.id + 1 : 1
  }

  const handleSave = () => {
    if (newCount <= 0) {
      alert('Count must be greater than 0.')
      return
    }
    // Validate the fields to ensure no field is empty
    if (
      !newTitle ||
      !newPrice ||
      !newCategory ||
      !newDescription ||
      !newImage
    ) {
      alert('Please fill all the fields before adding.')
      return // Don't proceed if any field is empty
    }

    if (newRating <= 0) {
      alert('Rating must be greater than 0.')
      return // Don't proceed if rating is invalid
    }

    if (newPrice <= 0) {
      alert('Price must be greater than 0.')
      return // Don't proceed if rating is invalid
    }

    // Dispatch the new product data with the calculated productId
    dispatch(
      addProduct({
        id: calculateProductId(), // Use the calculated productId
        title: newTitle,
        price: newPrice,
        category: newCategory,
        description: newDescription,
        image: newImage,
        rating: { rate: newRating, count: newCount },
      })
    )
    alert('Product Added Successfully')
    navigate('/') // Redirect to the product list or any desired page
  }

  return (
    <div className={`mode1  ${dark ? 'dark' : ''} `}>
      <h2 className="update-head">Add New Product</h2>
      <div className="update-product-container">
        <div className="update-product-container-content">
          <div>
            <label className="bb">Title:</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="newpdt-inp"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="bb">Price:</label>
            <input
              type="number"
              placeholder="Enter Price"
              className="newpdt-inp"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div className="addnew">
            <label className="bb">Category:</label>
            <select
              className="newpdt-inp"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            >
              <option className="newpdt-inp" hidden value="">
                Select Category
              </option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div>
            <label className="bb">Description:</label>
            <textarea
              className="newpdt-inp"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="bb">Image URL:</label>
            <input
              className="newpdt-inp"
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Enter product image URL"
            />
          </div>

          <div>
            <label className="bb">Rating:</label>
            <input
              className="newpdt-inp"
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              min="1"
              max="5"
            />
          </div>

          {
            <div>
              <label className="bb">Count:</label>
              <input
                className="newpdt-inp"
                type="number"
                value={newCount}
                onChange={(e) => setNewCount(Number(e.target.value))}
                min="1"
              />
            </div>
          }

          <button className="save" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewProduct
