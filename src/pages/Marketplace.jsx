import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import UseAxios from '../hooks/UseAxios'
import '../styles/Marketplace.css'

const Marketplace = () => {
  const navigate = useNavigate()
  const axiosInstance = UseAxios()
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [visibleCount, setVisibleCount] = useState(20); // 5 rows x 4 columns
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/listings')
        setAllProducts(response.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [axiosInstance])

  // Get unique categories
  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.color?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allProducts]);

  // Get visible products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  if (loading) {
    return (
      <div className='marketplace-container'>
        <div className='text-center py-8'>Loading marketplace...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='marketplace-container'>
        <div className='text-center py-8 text-red-500'>{error}</div>
      </div>
    )
  }

  return (
    <div className='marketplace-container'>
      {/* Header */}
      <div className='marketplace-header'>
        <h1>Marketplace</h1>
        <p>Explore our wide range of daily essentials and products</p>
      </div>

      {/* Search Bar */}
      <div className='search-filter-section'>
        <div className='search-box'>
          <input
            type='text'
            placeholder='Search by product name, brand, or color...'
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(20); // Reset to first page on search
            }}
          />
          <span className='search-icon'>🔍</span>
        </div>

        {/* Category Filter */}
        <div className='category-filter'>
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setVisibleCount(20); // Reset to first page on filter
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className='results-info'>
        <p>Showing {visibleProducts.length} of {filteredProducts.length} products</p>
      </div>

      {/* Products Grid */}
      {visibleProducts.length > 0 ? (
        <div className='products-grid'>
          {visibleProducts.map(product => (
            <div key={product.id} className='product-card'>
              <div className='product-image'>
                <img src={product.image} alt={product.name} />
                <div className='product-badge'>New</div>
              </div>
              <div className='product-info'>
                <h3 className='product-name'>{product.name}</h3>
                <p className='product-brand'>Brand: <span>{product.brand}</span></p>
                <p className='product-color'>Color: <span>{product.color}</span></p>
                <div className='product-footer'>
                  <p className='product-price'>Tk {product.price.toLocaleString('en-IN')}</p>
                  <button
                    className='add-to-cart-btn'
                    onClick={() => navigate(`/ViewDetails/${product._id}`)}
                  >
                    View details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-products'>
          <p>No products found matching your criteria.</p>
        </div>
      )}

      {/* Show More Button */}
      {visibleCount < filteredProducts.length && (
        <div className='show-more-container'>
          <button className='show-more-btn' onClick={handleShowMore}>
            Show More Products
          </button>
        </div>
      )}

      {/* All loaded message */}
      {visibleCount >= filteredProducts.length && filteredProducts.length > 0 && (
        <div className='all-loaded'>
          <p>All products loaded!</p>
        </div>
      )}
    </div>
  )
}

export default Marketplace
