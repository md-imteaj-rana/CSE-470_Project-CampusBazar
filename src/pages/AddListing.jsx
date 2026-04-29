import React from 'react'

const AddListing = () => {
  return (
    <div>
      <title>Add Listing</title>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-5 py-2 rounded-full mb-4 text-sm font-medium">
              🏷️ New Listing
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Add a Listing
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Fill in the details below to post your item on CampusBazar
            </p>
          </div>

          {/* Form Card */}
          <form className="bg-white shadow-xl rounded-3xl p-8 space-y-6">

            {/* Two column row — Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. MacBook Air M1"
                  className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <select
                  name="category"
                  className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800"
                >
                  <option value="Clothes & Fashion">Clothes & Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Care Products">Care Products</option>
                  <option value="Automobile">Automobile</option>
                </select>
              </div>
            </div>

            {/* Two column row — Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (Tk)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 5000"
                  className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Dhaka University"
                  className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your item — condition, age, reason for selling..."
                className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400 h-32 resize-none py-3"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                placeholder="https://your-image-link.com/photo.jpg"
                className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800 placeholder:text-gray-400"
                required
              />
            </div>

            {/* Two column row — Date & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Listing Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered w-full rounded-xl bg-gray-50 border-gray-200 focus:border-indigo-500 text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="input input-bordered w-full rounded-xl bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-2" />

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl border-none shadow-md transition-all duration-200 text-base font-semibold py-3"
            >
              🚀 Post Listing
            </button>

          </form>

          <p className="text-xs text-center text-gray-400 mt-6">
            By posting, you agree to our{' '}
            <a href="#" className="text-indigo-500 hover:underline">Listing Guidelines</a> &{' '}
            <a href="#" className="text-indigo-500 hover:underline">Community Standards</a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default AddListing