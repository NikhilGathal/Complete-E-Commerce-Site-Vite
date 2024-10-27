// // Action Types
// const WISHLIST_ADD_ITEM = 'wishList/addItem'
// const WISHLIST_REMOVE_ITEM = 'wishList/removeItem'

// // Action Creators
// export function addWishListItem(productId) {
//   return { type: WISHLIST_ADD_ITEM, payload: { productId } }
// }
// export function removeWishListItem(productId) {
//   return { type: WISHLIST_REMOVE_ITEM, payload: { productId } }
// }

// // Reducer
// export default function wishListReducer(state = [], action) {
//   switch (action.type) {
//     case WISHLIST_ADD_ITEM:
//       return [...state, action.payload]

//     case WISHLIST_REMOVE_ITEM:
//       return state.filter(
//         (wishListItem) => wishListItem.productId !== action.payload.productId
//       )
//     default:
//       return state
//   }
// }



import { createSelector, createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const findItemIndex = (state, action) =>
  state.findIndex((wishItem) => wishItem.productId === action.payload.productId)

const slice = createSlice({
  name: 'wish',
  initialState: {
    loading: false,
    list: [],
    error: '',
  },
  reducers: {
    addWishItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      if (existingItemIndex !== -1 ) state.list[existingItemIndex].quantity = 1
      else state.list.push({ ...action.payload, quantity: 1 })
    },
    removeWishItem(state, action) {
      const existingItemIndex = findItemIndex(state.list, action)
      state.list.splice(existingItemIndex, 1)
    },
    removeallWishItem(state)
    {
      state.list = []
    },
    loadWishItem(state,action)
    {
      if(action.payload.length)
      state.list = action.payload
    else
    state.list = []
    }
    // increaseCartItemQuantity(state, action) {
    //   const existingItemIndex = findItemIndex(state.list, action)
    //   state.list[existingItemIndex].quantity += 1
    // },
    // decreaseCartItemQuantity(state, action) {
    //   const existingItemIndex = findItemIndex(state.list, action)
    //   state.list[existingItemIndex].quantity -= 1
    //   if (state.list[existingItemIndex].quantity === 0)
    //     state.list.splice(existingItemIndex, 1)
    // },
  },
})

const getWishItems = ({ products, wishList }) => {
  return wishList.list
    .map(({ productId, quantity }) => {
      const wishProduct = products.list.find(
        (product) => product.id === productId
      )
      return { ...wishProduct, quantity }
    })
    .filter(({ title }) => title)
}

// for selector 

export const getAllWishItems = createSelector(getWishItems, (wishItems) => wishItems)
// export const getAllWishItems = createSelector(getWishItems, (wishItems) => [...wishItems])
// export const getCartLoadingState = (state) => state.products.loading
// export const getCartError = (state) => state.products.error

// Thunk Action Create

// export const fetchCartItemsdata = ()=> (dispatch)=> 
//   {
//     dispatch(fetchCartItems())
//     fetch(`https://fakestoreapi.com/carts/5 `)
//     .then((res) => res.json())
//     .then((data) => {
//         dispatch(loadCartItems(data))
//     })
//     .catch(() => {
//         dispatch(fetchCartItemsError())
//     })
//   } 

export const {
  loadWishItem,
  addWishItem,
  removeWishItem,
  removeallWishItem

  
} = slice.actions

export default slice.reducer
