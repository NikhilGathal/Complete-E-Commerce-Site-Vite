import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../store/slices/productsSlice'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './AddNewProduct.css'

const AddNewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [, dark] = useOutletContext()


  // Accessing the current state of p0roducts from the Redux store
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
    <div className={ `mode  ${ dark ? 'dark' : ''} `}>
      <h2 className="update-head">Add New Product</h2>
      <div className="update-product-container">
        <div className="update-product-container-content">
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Price:</label>
            <input
              type="number"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
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
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewProduct


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getAllProducts, updateAllProducts, addProduct } from '../store/slices/productsSlice';
// import Product from './Product';

// function CarouselPage() {
//   const dispatch = useDispatch();
//   const { carousel } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [sortPriceOrder, setSortPriceOrder] = useState('');
//   const [sortRatingOrder, setSortRatingOrder] = useState('');
//   const productsList = useSelector(getAllProducts);
//   const [Error, setError] = useState(null);
//   const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products

//   // Check if products exist in localStorage
//   useEffect(() => {
//     setLoading(true);

//     // If products are already in localStorage, load them from there
//     const storedProducts = JSON.parse(localStorage.getItem('productsList'));

//     if (storedProducts) {
//       // If products exist in localStorage, dispatch them to Redux
//       dispatch(updateAllProducts(storedProducts));
//       setFilteredProducts(storedProducts); // Set filtered products to the loaded ones
//       setLoading(false);
//     } else {
//       // Fetch products from the API if not found in localStorage
//       fetch(`https://fakestoreapi.com/products/category/${carousel}`)
//         .then((res) => res.json())
//         .then((data) => {
//           // Dispatch the fetched data to Redux and store it in localStorage
//           dispatch(updateAllProducts(data));
//           localStorage.setItem('productsList', JSON.stringify(data));
//           setFilteredProducts(data); // Set the filtered products to the fetched data
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//           setError("Something went wrong!");
//           setLoading(false);
//         });
//     }
//   }, [carousel, dispatch]);

//   // Handle adding a new product to Redux
//   const addProductHandler = (newProduct) => {
//     dispatch(addProduct(newProduct));  // Dispatch action to add the new product
//     const updatedProductsList = [...productsList, newProduct];
//     localStorage.setItem('productsList', JSON.stringify(updatedProductsList)); // Update localStorage
//   };

//   // Filter products based on the selected category and apply sorting
//   useEffect(() => {
//     if (productsList.length > 0) {
//       // Filter products by category
//       const filtered = productsList.filter(product => 
//         product.category.toLowerCase().includes(carousel.toLowerCase()) // Category filter
//       );

//       // Apply sorting
//       const sorted = filtered.sort((a, b) => {
//         if (sortPriceOrder === 'lowToHigh') return a.price - b.price;
//         if (sortPriceOrder === 'highToLow') return b.price - a.price;

//         if (sortRatingOrder === 'lowToHigh') return a.rating.rate - b.rating.rate;
//         if (sortRatingOrder === 'highToLow') return b.rating.rate - a.rating.rate;

//         return 0;
//       });

//       setFilteredProducts(sorted); // Update filtered products
//     }
//   }, [productsList, carousel, sortPriceOrder, sortRatingOrder]);

//   if (loading) {
//     return <h1 className='Load' style={{ textAlign: 'center' }}>Loading...</h1>;
//   }

//   if (Error) {
//     return <h1 className='home-error S' style={{ textAlign: 'center' }}>{Error}</h1>;
//   }

//   return (
//     <>
//       <div className="search-filter-container filter">
//         <select
//           id="sortPriceOrder"
//           value={sortPriceOrder}
//           onChange={(e) => {
//             setSortPriceOrder(e.target.value);
//             setSortRatingOrder(''); // Reset rating order when price sorting is selected
//           }}
//         >
//           <option value="">Sort by Price</option>
//           <option value="highToLow">High to Low</option>
//           <option value="lowToHigh">Low to High</option>
//         </select>

//         <select
//           id="sortRatingOrder"
//           value={sortRatingOrder}
//           onChange={(e) => {
//             setSortRatingOrder(e.target.value);
//             setSortPriceOrder(''); // Reset price order when rating sorting is selected
//           }}
//         >
//           <option value="">Sort by Rating</option>
//           <option value="highToLow">High to Low</option>
//           <option value="lowToHigh">Low to High</option>
//         </select>
//       </div>

//       <div className="products-container">
//         {filteredProducts.map(({ id, title, rating, price, image }) => (
//           <Product
//             key={id}
//             productId={id}
//             title={title}
//             rating={rating.rate}
//             price={price}
//             imageUrl={image}
//           />
//         ))}
//       </div>
//     </>
//   );
// }

// export default CarouselPage;

