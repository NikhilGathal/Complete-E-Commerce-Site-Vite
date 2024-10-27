import React from 'react'
import { fetchProductdata } from '../store/slices/productsSlice'
import { useDispatch } from 'react-redux'
export default function SelectMenu({ setquery1 ,setquery}) {
  const dispatch = useDispatch()
  return (
    <select className="filter-by-region " onChange={(e) => {
      if (e.target.value === 'Filter by Category')
       {
        setquery('')
        dispatch(fetchProductdata())
       }
      else {
        setquery('')
        setquery1(e.target.value.toLowerCase())
      }

    }
    }>
      <option >Filter by Category</option>
      <option value="jewelery">Jewelery</option>
      <option value="men's clothing">Men's Clothing</option>
      <option value="electronics">Electronics</option>
      <option value="women's clothing">Women's Clothing</option>
    </select>
  )
}

