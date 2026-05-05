import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Provider/AuthProvider'

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext)
  const userEmail = user?.email

  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (loading || !userEmail) return

    fetch(`http://localhost:3000/orders/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Orders from backend:', data)
        setOrders(data)
      })
      .catch((error) => {
        console.error('Error fetching orders:', error)
      })
  }, [loading, userEmail])

  if (loading) {
    return <p className="p-6">Loading...</p>
  }

  if (!user) {
    return <p className="p-6">Please login to view your orders.</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <title>My Orders</title>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-purple-600 text-white p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold">
                      Order ID: {order._id}
                    </h3>
                    <p className="text-sm flex items-center gap-2 mt-1">
                      Status:
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        (order.status || 'placed') === 'placed' ? 'bg-yellow-400 text-yellow-900' :
                        order.status === 'shipped' ? 'bg-blue-400 text-blue-900' :
                        'bg-green-400 text-green-900'
                      }`}>
                        {order.status || 'placed'}
                      </span>
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="font-semibold">
                      Total: Tk {order.totalPrice?.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="p-5 border-b">
                  <p>
                    <span className="font-semibold">Name:</span> {order.name}
                  </p>
                  <p>
                    <span className="font-semibold">Mobile:</span> {order.mobile}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span> {order.email}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{' '}
                    {order.location}
                  </p>

                  {order.extraNote && (
                    <p>
                      <span className="font-semibold">Note:</span>{' '}
                      {order.extraNote}
                    </p>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Unit Price</th>
                        <th className="px-6 py-4">Total Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      {order.items?.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-4 font-medium">
                            {item.name}
                          </td>

                          <td className="px-6 py-4">
                            {item.category}
                          </td>

                          <td className="px-6 py-4">
                            {item.quantity}
                          </td>

                          <td className="px-6 py-4">
                            Tk {item.price.toLocaleString('en-IN')}
                          </td>

                          <td className="px-6 py-4 font-semibold text-purple-700">
                            Tk {(item.quantity * item.price).toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders