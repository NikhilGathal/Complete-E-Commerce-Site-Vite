

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../store/slices/productsSlice'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import './AddNewProduct.css'

const UpdateProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [, dark] = useOutletContext()
  // Get the product from the Redux store by id
  const product = useSelector((state) => state.products.list.find(p => p.id === parseInt(id)))

  // Set initial state for the form fields
  const [newTitle, setNewTitle] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newRating, setNewRating] = useState(1)

  useEffect(() => {
    // If product is found, set the form fields with its data
    if (product) {
      setNewTitle(product.title)
      setNewPrice(product.price)
      setNewCategory(product.category)
      setNewDescription(product.description)
      setNewImage(product.image)
      setNewRating(product.rating ? product.rating.rate : 1)  // Safeguard if rating doesn't exist
    }
  }, [product]) // Only re-run the effect if 'product' changes

  const handleSave = () => {
    // Dispatch the update action with the new values and the existing product id
    if (product) {
      dispatch(updateProduct({
        id: product.id,
        title: newTitle,
        price: newPrice,
        category: newCategory,
        description: newDescription,
        image: newImage,
        rating: { rate: newRating }
      }))
      navigate('/') // Redirect after update
    }
  }

  // Handle case when product doesn't exist
  if (!product) {
    return <div>Loading or Product not found</div>
  }

  return (
    <div className={ `mode  ${ dark ? 'dark' : ''} `}>
      <h2 className="update-head">Update Product</h2>
      <div className="update-product-container">
        <div className="update-product-container-content">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label>Category:</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter product category"
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Enter product image URL"
            />
          </div>

          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              min="1"
              max="5"
            />
          </div>

          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProduct

