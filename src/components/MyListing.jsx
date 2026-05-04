import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import UseAxios from '../hooks/UseAxios'

const MyListing = () => {
  const { user } = useContext(AuthContext)
  const axiosInstance = UseAxios()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user?.email) {
      fetchUserListings()
    }
  }, [user?.email])

  const fetchUserListings = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/listings/${user?.email}`)
      setListings(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching listings:', err)
      setError('Failed to load your listings')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading your listings...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>You haven't posted any listings yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={listing.image} 
              alt={listing.name} 
              className="w-full h-48 object-cover"
              onError={(e) => e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'}
            />
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{listing.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{listing.description}</p>
              <p className="text-indigo-600 font-bold text-lg mb-2">Tk {listing.price}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>📍 {listing.location}</span>
                <span>📁 {listing.category}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Posted: {listing.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyListing
