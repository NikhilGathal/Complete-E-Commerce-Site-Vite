import React, { useEffect, useState } from 'react'
import { useOutletContext, Link, useNavigate } from 'react-router-dom' // ✅ Import Link
import './EmailsList.css' // Reuse same CSS

const OutOfStockProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [, dark] = useOutletContext()
  const navigate = useNavigate()
  const isAdminLog = localStorage.getItem('isadminlog') === 'true'
  useEffect(() => {
    if (!isAdminLog) {
      navigate('/')
    }
  }, [isAdminLog])

  if (!isAdminLog) {
    return null // ✅ Prevents rendering if admin is not logged in
  }

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem('productsList')) || []
    const outOfStockProducts = storedProducts.filter(
      (product) => product.rating?.count === 0
    )
    setProducts(outOfStockProducts)
    setTimeout(() => {
      setLoading(false)
    }, 900)
  }, [])

  return (
    <div className={`emails-list-container ${dark ? 'dark' : ''}`}>
      {loading ? (
        <div className="admin">
          <h1>Loading Out of Stock Products...</h1>
        </div>
      ) : products.length === 0 ? (
        <div className="admin">
          <h1>No Out of Stock Products Found</h1>
        </div>
      ) : (
        <>
          <h2 className="emails-list-heading">Out of Stock Products</h2>

          <div className="emails-table-container">
            <table className="emails-table">
              <thead>
                <tr className="emails-table-header">
                  <th>Sr No.</th>
                  <th>Product ID</th> <th>Title</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id} className="emails-table-row">
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/product/${product.id}`} className="heading">
                        {product.id}
                      </Link>{' '}
                      {/* ✅ clickable ID */}
                    </td>

                    <td>
                      <Link to={`/producte/${product.id}`} className="heading">
                        {product.title}
                      </Link>{' '}
                      {/* ✅ clickable Title */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default OutOfStockProducts
