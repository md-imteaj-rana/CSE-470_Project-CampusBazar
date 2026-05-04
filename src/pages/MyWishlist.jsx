import React from 'react';

const MyWishlist = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md p-12 text-center w-full max-w-4xl mx-auto mt-8">
      <div className="text-5xl mb-4 text-pink-500">❤️</div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">My Wishlist</h3>
      <p className="text-gray-500">You haven't added any items to your wishlist yet.</p>
    </div>
  );
};

export default MyWishlist;
