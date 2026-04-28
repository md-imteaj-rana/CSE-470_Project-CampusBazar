import React, { useEffect, useState } from 'react'

const MyCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [showOrderForm, setShowOrderForm] = useState(false)

  const [orderInfo, setOrderInfo] = useState({
    name: '',
    mobile: '',
    email: 'student@example.com',
    location: '',
    extraNote: '',
    paymentMethod: 'Cash on Delivery',
    paymentNumber: '',
    transactionId: '',
  })

  useEffect(() => {
    const dummyCart = [
      {
        id: 'P-001',
        name: 'Cotton T-Shirt',
        category: 'Clothing',
        price: 500,
        quantity: 2,
      },
      {
        id: 'P-002',
        name: 'Smartphone Pro',
        category: 'Electronics',
        price: 25000,
        quantity: 1,
      },
      {
        id: 'P-003',
        name: 'Wireless Earphones',
        category: 'Accessories',
        price: 3000,
        quantity: 3,
      },
    ]

    setCartItems(dummyCart)
  }, [])

  const increaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCartItems(updated)
  }

  const decreaseQuantity = (id) => {
    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    )
    setCartItems(updated)
  }

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id)
    setCartItems(updated)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setOrderInfo(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleConfirmOrderClick = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }

    setShowOrderForm(true)
  }

  const handleSubmitOrder = (e) => {
    e.preventDefault()

    if (orderInfo.paymentMethod === 'Mobile Banking') {
      if (!orderInfo.paymentNumber || !orderInfo.transactionId) {
        alert('Please provide payment mobile number and transaction ID.')
        return
      }
    }

    alert('Order placed successfully!')
    setShowOrderForm(false)
  }

  return (
    <div className="min-h-screen bg-purple-100 px-6 py-10">
      <title>My Cart</title>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          My Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="bg-white rounded-2xl shadow-md overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.name}</td>
                      <td className="px-6 py-4">{item.category}</td>

                      <td className="px-6 py-4">
                        Tk {item.price.toLocaleString('en-IN')}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 bg-gray-200 rounded"
                          >
                            +
                          </button>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                            title="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-purple-700">
                        Tk {(item.price * item.quantity).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800">
                  Total: Tk {totalPrice.toLocaleString('en-IN')}
                </h3>

                <button
                  onClick={handleConfirmOrderClick}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
                >
                  Confirm Order
                </button>
              </div>
            </div>

            {showOrderForm && (
              <div className="fixed inset-0 bg-purple-100/80 backdrop-blur-sm flex items-center justify-center px-4 py-6 z-50">
                <div className="bg-white rounded-3xl shadow-2xl w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Delivery & Payment Details
                    </h3>

                    <button
                      onClick={() => setShowOrderForm(false)}
                      className="text-gray-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label>
                        Name
                        <input
                          type="text"
                          name="name"
                          value={orderInfo.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="w-full border p-3 rounded-lg mt-1"
                          required
                        />
                      </label>

                      <label>
                        Mobile Number
                        <input
                          type="tel"
                          name="mobile"
                          value={orderInfo.mobile}
                          onChange={handleInputChange}
                          placeholder="Enter your mobile number"
                          className="w-full border p-3 rounded-lg mt-1"
                          required
                        />
                      </label>
                    </div>

                    <label>
                      Email
                      <input
                        type="email"
                        name="email"
                        value={orderInfo.email}
                        readOnly
                        className="w-full border p-3 rounded-lg mt-1 bg-gray-100"
                      />
                    </label>

                    <label>
                      Detailed Location
                      <textarea
                        name="location"
                        value={orderInfo.location}
                        onChange={handleInputChange}
                        placeholder="Enter your full delivery location"
                        className="w-full border p-3 rounded-lg mt-1"
                        rows="2"
                        required
                      />
                    </label>

                    <label>
                      Extra Note for Deliveryman
                      <textarea
                        name="extraNote"
                        value={orderInfo.extraNote}
                        onChange={handleInputChange}
                        placeholder="Example: Call before delivery, meet near campus gate, etc."
                        className="w-full border p-3 rounded-lg mt-1"
                        rows="2"
                      />
                    </label>

                    <div>
                      <p className="font-semibold text-gray-800 mb-3">
                        Payment Method
                      </p>

                      <div className="space-y-3">
                        <label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer">
                          <span>💵 Cash on Delivery</span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Cash on Delivery"
                            checked={orderInfo.paymentMethod === 'Cash on Delivery'}
                            onChange={handleInputChange}
                          />
                        </label>

                        <label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer">
                          <span>📱 Mobile Banking</span>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="Mobile Banking"
                            checked={orderInfo.paymentMethod === 'Mobile Banking'}
                            onChange={handleInputChange}
                          />
                        </label>
                      </div>
                    </div>

                    {orderInfo.paymentMethod === 'Mobile Banking' && (
                      <div className="border rounded-xl p-4 bg-gray-50">
                        <p className="font-semibold mb-2">
                          Payment Instructions
                        </p>

                        <p className="text-sm text-gray-700 mb-4">
                          After making payment via bKash/Nagad/Rocket, enter your
                          payment mobile number and transaction ID. The seller will
                          verify your payment.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="paymentNumber"
                            value={orderInfo.paymentNumber}
                            onChange={handleInputChange}
                            placeholder="Payment Mobile Number"
                            className="w-full border p-3 rounded-lg"
                          />

                          <input
                            type="text"
                            name="transactionId"
                            value={orderInfo.transactionId}
                            onChange={handleInputChange}
                            placeholder="Transaction ID"
                            className="w-full border p-3 rounded-lg"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center border-t pt-4">
                      <h4 className="text-xl font-bold text-gray-800">
                        Total: Tk {totalPrice.toLocaleString('en-IN')}
                      </h4>

                      <button
                        type="submit"
                        className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700"
                      >
                        Place Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyCart