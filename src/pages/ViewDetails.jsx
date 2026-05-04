import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import UseAxios from '../hooks/UseAxios'
import '../styles/ViewDetails.css'

const ViewDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const axiosInstance = UseAxios()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartAdded, setCartAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        let productData

        if (id) {
          const response = await axiosInstance.get(`/listing/${id}`)
          productData = response.data
        } else if (location.state?.product) {
          productData = location.state.product
        }

        setProduct(productData)
        setError(null)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id, location.state, axiosInstance])

  const handleAddToCart = () => {
    if (!product) return

    const cartKey = 'campusbazar-cart'
    const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]')
    const itemId = product._id || product.id
    const cartItem = {
      id: itemId,
      name: product.name,
      category: product.category,
      price: Number(product.price) || 0,
      location: product.location || '',
      image: product.image,
      quantity: 1,
      sellerEmail: product.email || product.sellerName || '',
      listingDate: product.date || product.createdAt || '',
    }

    const existingIndex = existingCart.findIndex(item => item.id === itemId)
    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem(cartKey, JSON.stringify(existingCart))
    setCartAdded(true)
    alert(`${product.name} has been added to cart.`)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const dateObject = new Date(dateString)
    if (Number.isNaN(dateObject.getTime())) return dateString
    return dateObject.toLocaleDateString('en-US')
  }

  if (loading) {
    return (
      <div className='view-details-container'>
        <div className='view-details-card'>
          <div className='text-center py-8'>Loading product details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='view-details-container'>
        <div className='view-details-card'>
          <h2>Product not found</h2>
          <p className='text-red-500'>{error}</p>
          <button className='back-btn' onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='view-details-container'>
        <div className='view-details-card'>
          <h2>Product not found</h2>
          <p>There was a problem loading the product details.</p>
          <button className='back-btn' onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='view-details-container'>
      <div className='view-details-card'>
        <div className='view-details-grid'>
          <div className='view-image-panel'>
            <img src={product.image} alt={product.name} />
          </div>

          <div className='view-info-panel'>
            <h1>{product.name}</h1>
            <p className='view-category'>Category: <span>{product.category}</span></p>
            <p className='view-description'>Description:</p>
            <p className='view-description-text'>
              {product.description || 'No description available for this product.'}
            </p>
            <p className='view-detail'><strong>Seller Name:</strong> {product.sellerName || 'Not provided'}</p>
            <p className='view-detail'><strong>Provider Email:</strong> {product.email || 'Not provided'}</p>
            <p className='view-detail'><strong>Location:</strong> {product.location || 'Not provided'}</p>
            <p className='view-detail'><strong>Listed at:</strong> {formatDate(product.date || product.createdAt)}</p>
          </div>

          <div className='view-order-panel'>
            <div className='price-card'>
              <p className='price-label'>Price</p>
              <p className='price-value'>Tk {Number(product.price).toLocaleString('en-IN')}</p>
            </div>
            <button className='order-btn' onClick={handleAddToCart} disabled={cartAdded}>
              {cartAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button className='back-btn' onClick={() => navigate(-1)}>
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
