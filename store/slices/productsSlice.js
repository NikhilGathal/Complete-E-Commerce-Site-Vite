import { createSlice } from '@reduxjs/toolkit'
import { productsList } from '../productsList.js';
const findItemIndex = (state, action) =>
  state.findIndex((cartItem) => cartItem.productId === action.payload.productId)

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

export const { updateAllProducts, fetchProducts, fetchProductsError, deleteProduct, updateProduct,addProduct } = slice.actions

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
    fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => {
        // Update Redux state and localStorage with the fetched data
        dispatch(updateAllProducts(data));
        localStorage.setItem('productsList', JSON.stringify(data));
      })
      .catch(() => {
        dispatch(fetchProductsError());
      });
  }
};


export default slice.reducer
