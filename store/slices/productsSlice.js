import { createSlice } from '@reduxjs/toolkit'
import { productsList } from '../productsList.js';
const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.productId === action.payload.productId)

// Action types 

// product/fetchProducts – triggered by the fetchProducts reducer.
// product/fetchProductsError – triggered by the fetchProductsError reducer.
// product/updateAllProducts – triggered by the updateAllProducts reducer.
// product/addProduct – triggered by the addProduct reducer.
// product/deleteProduct – triggered by the deleteProduct reducer.
// product/updateProduct – triggered by the updateProduct reducer.

const slice = createSlice({
  name: 'product',
  initialState: {
    loading: false,
    list: JSON.parse(localStorage.getItem('productsList')) || [...productsList],
    error: '',
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true
    },
    fetchProductsError(state, action) {
      state.loading = false
      state.error = action.payload || 'Something went wrong!'
    },
    updateAllProducts(state, action) {
      state.loading = false
      state.list = action.payload
      state.error = ''
    },


    addProduct(state, action) {
      const newProduct = action.payload;
      state.list.push(newProduct); // Add the new product to the list
      localStorage.setItem('productsList', JSON.stringify(state.list)); // Update localStorage
    },
    deleteProduct(state, action) {
      state.list = state.list.filter((product) => product.id !== action.payload); // Delete product by ID
      localStorage.setItem('productsList', JSON.stringify(state.list)); // Update localStorage
    },
    updateProduct(state, action) {
      const {
        id,
        title,
        price,
        category,
        description,
        image,
        rating = { rate: 0 }, // Default value for rating
      } = action.payload;

      const index = state.list.findIndex((product) => product.id === id); // Find the correct index
      if (index !== -1) {
        // Update the product at the found index
        state.list[index] = { id, title, price, category, description, image, rating };
        localStorage.setItem('productsList', JSON.stringify(state.list)); // Update localStorage
      }
    },
  },
})

export const getAllProducts = (state) => state.products.list
export const getProductLoadingState = (state) => state.products.loading
export const getProductError = (state) => state.products.error

export const { updateAllProducts, fetchProducts, fetchProductsError, deleteProduct, updateProduct, addProduct } = slice.actions

// export const fetchProductdata = () => (dispatch) => {
//   dispatch(fetchProducts())
//   fetch(`https://fakestoreapi.com/products`)
//     .then((res) => res.json())
//     .then((data) => {
//       dispatch(updateAllProducts(data))
//     })
//     .catch(() => {
//       dispatch(fetchProductsError())
//     })
// }

export const fetchProductdata = () => (dispatch) => {
  // Check if data exists in localStorage
  const localData = JSON.parse(localStorage.getItem('productsList'));

  if (localData && localData.length > 0) {
    // Use localStorage data
    dispatch(updateAllProducts(localData));
  } else {
    // Fetch data from API and store it in localStorage
    dispatch(fetchProducts());
    fetch(`https://fakestoreapi.com/productss`)
      .then((res) => res.json())
      .then((data) => {
        // Update Redux state and localStorage with the fetched data
        dispatch(updateAllProducts(data));
        localStorage.setItem('productsList', JSON.stringify(data));
      })
      .catch(() => {
        // dispatch(fetchProductsError());
        dispatch(updateAllProducts(productsList));
        localStorage.setItem('productsList', JSON.stringify(productsList));
      });
  }
};








// export const fetchProductdata = () => async (dispatch) => {
//   try {
//     // Check if the user is online
//     if (!navigator.onLine) {
//       console.warn('No internet connection detected');
//       // You can dispatch a fallback action or use localStorage data
//       const storedProducts = JSON.parse(localStorage.getItem('productsList') || '[]');
//       if (storedProducts.length > 0) {
//         dispatch(updateAllProducts(storedProducts));
//       } else {
//         // If no data in localStorage, fallback to default products
//         const defaultProducts = [
//           { id: 1, title: 'Default Product 1', price: 100, image: 'https://via.placeholder.com/150' },
//           { id: 2, title: 'Default Product 2', price: 200, image: 'https://via.placeholder.com/150' },
//           { id: 3, title: 'Default Product 3', price: 300, image: 'https://via.placeholder.com/150' },
//         ];
//         dispatch(updateAllProducts(defaultProducts));
//       }
//       return; // Return early if no internet connection
//     }

//     // Check if data exists in localStorage
//     const localData = JSON.parse(localStorage.getItem('productsList'));
//     if (localData && localData.length > 0) {
//       dispatch(updateAllProducts(localData)); // Use localStorage data
//       return;
//     }

//     // Fetch data from API and store it in localStorage
//     dispatch(fetchProducts());

//     try {
//       const res = await fetch(`https://fakestoreapi.com/products`);

//       if (!res.ok) {
//         throw new Error('Failed to fetch products');
//       }

//       const data = await res.json();
//       // Update Redux state and localStorage with the fetched data
//       dispatch(updateAllProducts(data));
//       localStorage.setItem('productsList', JSON.stringify(data));
//     } catch (apiError) {
//       console.error('API fetch failed:', apiError);
//       // Handle the error by dispatching fallback data or showing an error message
//       dispatch(updateAllProducts(productsList));
//     }
//   } catch (error) {
//     // Catch any other errors
//     console.error('Error fetching product data:', error);
//     // Fallback to default products
//     dispatch(updateAllProducts(productsList));
//   }
// };

export default slice.reducer
