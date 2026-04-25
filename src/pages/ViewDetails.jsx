import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/ViewDetails.css'

const ViewDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [orderData, setOrderData] = useState({
    buyerName: '',
    email: '',
    phone: '',
    quantity: 1,
    pickupDate: '',
    address: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOrderData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleOrderSubmit = (e) => {
    e.preventDefault()
    setIsModalOpen(false)
    alert('Your order request has been sent successfully!')
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
            <p className='view-description-text'>This is a detailed view of the selected product. You can customize this text later to show real product descriptions, available stock, or seller notes.</p>
            <p className='view-detail'><strong>Brand:</strong> {product.brand}</p>
            <p className='view-detail'><strong>Color:</strong> {product.color}</p>
            <p className='view-detail'><strong>Provider Email:</strong> seller@example.com</p>
            <p className='view-detail'><strong>Location:</strong> Siberia</p>
            <p className='view-detail'><strong>Listed at:</strong> 2025-12-10</p>
          </div>

          <div className='view-order-panel'>
            <div className='price-card'>
              <p className='price-label'>Price</p>
              <p className='price-value'>Tk {product.price.toLocaleString('en-IN')}</p>
            </div>
            <button className='order-btn' onClick={() => setIsModalOpen(true)}>
              Order Now
            </button>
            <button className='back-btn' onClick={() => navigate(-1)}>
              Back to Marketplace
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal-overlay'>
          <div className='order-modal'>
            <div className='modal-header'>
              <div>
                <h2>Confirm Your Order</h2>
                <p>Review the details and submit your order request.</p>
              </div>
              <button className='modal-close' onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>

            <div className='modal-summary'>
              <div>
                <p><strong>Item:</strong> {product.name}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Price:</strong> Tk {product.price.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p><strong>Seller Location:</strong> Siberia</p>
                <p><strong>Product ID:</strong> {product.id}</p>
              </div>
            </div>

            <form className='order-form' onSubmit={handleOrderSubmit}>
              <div className='order-form-row'>
                <label>
                  Buyer Name
                  <input
                    type='text'
                    name='buyerName'
                    value={orderData.buyerName}
                    onChange={handleInputChange}
                    placeholder='Enter your name'
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type='email'
                    name='email'
                    value={orderData.email}
                    onChange={handleInputChange}
                    placeholder='Enter your email'
                    required
                  />
                </label>
              </div>

              <div className='order-form-row'>
                <label>
                  Product ID
                  <input type='text' value={product.id} readOnly />
                </label>
                <label>
                  Product Name
                  <input type='text' value={product.name} readOnly />
                </label>
              </div>

              <div className='order-form-row'>
                <label>
                  Phone Number
                  <input
                    type='tel'
                    name='phone'
                    value={orderData.phone}
                    onChange={handleInputChange}
                    placeholder='Enter your phone number'
                    required
                  />
                </label>
                <label>
                  Quantity
                  <input
                    type='number'
                    name='quantity'
                    value={orderData.quantity}
                    onChange={handleInputChange}
                    min='1'
                    required
                  />
                </label>
              </div>

              <div className='order-form-row'>
                <label>
                  Price
                  <input type='text' value={product.price.toLocaleString('en-IN')} readOnly />
                </label>
                <label>
                  Pickup Date
                  <input
                    type='date'
                    name='pickupDate'
                    value={orderData.pickupDate}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </div>

              <label className='order-form-fullwidth'>
                Address
                <textarea
                  name='address'
                  value={orderData.address}
                  onChange={handleInputChange}
                  placeholder='Enter your pickup address'
                  required
                />
              </label>

              <div className='modal-actions'>
                <button type='button' className='back-btn' onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type='submit' className='order-btn'>
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewDetails
