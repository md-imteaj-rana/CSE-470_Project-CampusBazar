import React, { useEffect, useState } from 'react'

const MyOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const dummyOrders = [
      {
        orderId: 'ORD-001',
        productName: 'Cotton T-Shirt',
        quantity: 2,
        productDetails: 'Nike Blue T-Shirt',
        unitPrice: 71880,
      },
      {
        orderId: 'ORD-002',
        productName: 'Smartphone Pro',
        quantity: 1,
        productDetails: 'Apple Space Gray Phone',
        unitPrice: 3119880,
      },
      {
        orderId: 'ORD-003',
        productName: 'Wireless Earphones',
        quantity: 3,
        productDetails: 'Bose White Earphones',
        unitPrice: 419880,
      },
    ]

    setOrders(dummyOrders)
  }, [])

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
          <div className="bg-white rounded-xl shadow-md overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Unit Price</th>
                  <th className="px-6 py-4">Total Price</th>
                </tr>
              </thead>

              <tbody>
                {orders.map(order => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">
                      {order.orderId}
                    </td>

                    <td className="px-6 py-4">
                      {order.productName}
                    </td>

                    <td className="px-6 py-4">
                      {order.quantity}
                    </td>

                    <td className="px-6 py-4">
                      {order.productDetails}
                    </td>

                    <td className="px-6 py-4">
                      Tk {order.unitPrice.toLocaleString('en-IN')}
                    </td>

                    <td className="px-6 py-4 font-semibold text-purple-700">
                      Tk {(order.quantity * order.unitPrice).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders