import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import UseAxios from '../hooks/UseAxios';

const MyListing = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = UseAxios();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetchUserListings();
    }
  }, [user?.email]);

  const fetchUserListings = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/listings/${user?.email}`);
      setListings(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">My Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-56 overflow-hidden bg-gray-100">
              <img
                src={listing.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={listing.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
              />
              <div className="absolute top-4 left-4 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {listing.category || 'Uncategorized'}
              </div>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.name}</h3>
                <p className="text-sm text-gray-600">{listing.description || 'No description provided.'}</p>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Price:</span>{' '}
                  Tk {Number(listing.price || 0).toLocaleString('en-IN')}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Location:</span>{' '}
                  {listing.location || 'N/A'}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Seller:</span>{' '}
                  {listing.sellerName || listing.email || 'Unknown'}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Posted:</span>{' '}
                  {listing.date ? new Date(listing.date).toLocaleDateString('en-GB') : 'Unknown date'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyListing
