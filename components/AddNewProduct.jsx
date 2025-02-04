import { useState } from 'react'
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

  // Calculate productId based on the current state
  const calculateProductId = () => {
    // Generate the next ID by getting the length of the existing products list
    return products.length + 1
  }

  const handleSave = () => {
    // Validate the fields to ensure no field is empty
    if (!newTitle || !newPrice || !newCategory || !newDescription || !newImage) {
      alert('Please fill all the fields before adding.');
      return; // Don't proceed if any field is empty
    }

    if (newRating <= 0) {
      alert('Rating must be greater than 0.');
      return; // Don't proceed if rating is invalid
    }

    if (newPrice <= 0) {
      alert('Price must be greater than 0.');
      return; // Don't proceed if rating is invalid
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
        rating: { rate: newRating },
      })
    )
    navigate('/') // Redirect to the product list or any desired page
  }

  return (
    <div className={`mode1  ${dark ? 'dark' : ''} `}>
      <h2 className="update-head">Add New Product</h2>
      <div className="update-product-container">
        <div className="update-product-container-content">
          <div>
            <label>Title:</label>
            <input
              type="text"
              placeholder='Enter Title'
              className='newpdt-inp'
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
               placeholder='Enter Price'
              className='newpdt-inp'
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>

          <div className='addnew'>
            <label>Category:</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}>
              <option className='newpdt-inp' value="">Select Category</option>
              <option value="jewelery">Jewelery</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          <div>
            <label>Description:</label>
            <textarea
            className='newpdt-inp'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label>Image URL:</label>
            <input
            className='newpdt-inp'
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Enter product image URL"
            />
          </div>

          <div>
            <label>Rating:</label>
            <input
            className='newpdt-inp'
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              min="1"
              max="5"
            />
          </div>

          <button className="save" onClick={handleSave}>
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewProduct
