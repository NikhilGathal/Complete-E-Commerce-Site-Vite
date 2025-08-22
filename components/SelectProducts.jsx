import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import './SelectProducts.css'

const SelectProducts = () => {
  const navigate = useNavigate()
  const [ids, setIds] = useState('')
  const [, dark] = useOutletContext() // ✅ get dark from context

  const handleSave = () => {
    console.log(ids);
    
    const arr = ids
      .split(',')
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id))

    if (arr.length !== 3) {
      alert('Please enter all 3 IDs!')
      return
    }
    localStorage.setItem('topProductList', JSON.stringify(arr))
    alert('Top products saved!')
    navigate('/')
  }

  const isAdminLog = localStorage.getItem('isadminlog') === 'true'
  useEffect(() => {
    const alrd = JSON.parse(localStorage.getItem('topProductList'))
  if (alrd && Array.isArray(alrd)) {
    setIds(alrd.join(','))   // convert array [9,5,8] → "9,5,8"
  }

    if (!isAdminLog) {
      navigate('/')
    }
  }, [isAdminLog])

  if (!isAdminLog) {
    return null // ✅ Prevents rendering if admin is not logged in
  }

  return (
    <div className="select-products-wrapper">
      <h2 className="select-products-title">Select Top Products ID</h2>
      <div className={`select-products-container ${dark ? 'dark' : ''}`}>
        <input
          type="text"
          placeholder="Enter product IDs, e.g. 3,7,20"
          value={ids}
          onChange={(e) => setIds(e.target.value)}
          className="select-products-input"
        />
        <button onClick={handleSave} className="select-products-button">
          Save
        </button>
      </div>
    </div>
  )
}

export default SelectProducts
