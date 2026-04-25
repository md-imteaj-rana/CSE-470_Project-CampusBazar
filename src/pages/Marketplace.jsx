import React, { useState, useMemo } from 'react'
import '../styles/Marketplace.css'

const Marketplace = () => {
  // Sample product data with placeholder images
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allProducts = [
    { id: 1, name: 'Cotton T-Shirt', price: 71880, color: 'Blue', brand: 'Nike', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', category: 't-shirt' },
    { id: 2, name: 'Casual Dress', price: 155880, color: 'Red', brand: 'Zara', image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=300&h=300&fit=crop', category: 'dress' },
    { id: 3, name: 'Bicycle', price: 1079880, color: 'Black', brand: 'Hero', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', category: 'bicycle' },
    { id: 4, name: 'Smartphone Pro', price: 3119880, color: 'Space Gray', brand: 'Apple', image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=300&h=300&fit=crop', category: 'phone' },
    { id: 5, name: 'Wireless Earphones', price: 419880, color: 'White', brand: 'Bose', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', category: 'earphones' },
    { id: 6, name: 'Fast Charger', price: 95880, color: 'White', brand: 'Anker', image: 'https://images.unsplash.com/photo-1591290619762-f88cea7d4aba?w=300&h=300&fit=crop', category: 'charger' },
    { id: 7, name: 'Laptop Pro 15', price: 10799880, color: 'Silver', brand: 'Dell', image: 'https://images.unsplash.com/photo-1588872657840-6aed008f3d75?w=300&h=300&fit=crop', category: 'laptop' },
    { id: 8, name: 'Polo T-Shirt', price: 89880, color: 'Green', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1618556147713-fdb79b2e12e0?w=300&h=300&fit=crop', category: 't-shirt' },
    { id: 9, name: 'Evening Dress', price: 359880, color: 'Black', brand: 'Forever 21', image: 'https://images.unsplash.com/photo-1595607707441-86c1f94a5e9b?w=300&h=300&fit=crop', category: 'dress' },
    { id: 10, name: 'Road Bike', price: 1559880, color: 'Red', brand: 'Firefox', image: '', category: 'bicycle' },
    { id: 11, name: 'Android Phone', price: 2279880, color: 'Blue', brand: 'Samsung', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf373f991?w=300&h=300&fit=crop', category: 'phone' },
    { id: 12, name: 'Noise Earbuds', price: 275880, color: 'Black', brand: 'Noise', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop', category: 'earphones' },
    { id: 13, name: 'USB-C Charger', price: 71880, color: 'Black', brand: 'Belkin', image: 'https://images.unsplash.com/photo-1591290619762-f88cea7d4aba?w=300&h=300&fit=crop', category: 'charger' },
    { id: 14, name: 'Gaming Laptop', price: 11999880, color: 'Black', brand: 'ASUS', image: 'https://images.unsplash.com/photo-1588872657840-6aed008f3d75?w=300&h=300&fit=crop', category: 'laptop' },
    { id: 15, name: 'V-Neck T-Shirt', price: 77880, color: 'White', brand: 'Calvin Klein', image: 'https://images.unsplash.com/photo-1499856871957-5b8620a42033?w=300&h=300&fit=crop', category: 't-shirt' },
    { id: 16, name: 'Party Dress', price: 215880, color: 'Golden', brand: 'Mango', image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=300&h=300&fit=crop', category: 'dress' },
    { id: 17, name: 'BMX Bicycle', price: 839880, color: 'Yellow', brand: 'Jaguar', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', category: 'bicycle' },
    { id: 18, name: 'Budget Phone', price: 1199880, color: 'Green', brand: 'Realme', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=300&h=300&fit=crop', category: 'phone' },
    { id: 19, name: 'JBL Earphones', price: 539880, color: 'Blue', brand: 'JBL', image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop', category: 'earphones' },
    { id: 20, name: 'Wireless Charger', price: 155880, color: 'White', brand: 'Mophie', image: 'https://images.unsplash.com/photo-1591290619762-f88cea7d4aba?w=300&h=300&fit=crop', category: 'charger' },
    { id: 21, name: 'MacBook Air', price: 9599880, color: 'Gold', brand: 'Apple', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=300&fit=crop', category: 'laptop' },
    { id: 22, name: 'Striped T-Shirt', price: 83880, color: 'Navy', brand: 'Tommy Hilfiger', image: 'https://images.unsplash.com/photo-1503341338985-ab7cc9cfc54f?w=300&h=300&fit=crop', category: 't-shirt' },
    { id: 23, name: 'Casual Maxi Dress', price: 191880, color: 'Purple', brand: 'H&M', image: 'https://images.unsplash.com/photo-1612336307429-8a88e8d08514?w=300&h=300&fit=crop', category: 'dress' },
    { id: 24, name: 'Electric Scooter', price: 1919880, color: 'White', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', category: 'bicycle' },
    { id: 25, name: 'toy', price: 1919880, color: 'green', brand: 'abc', image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=300&h=300&fit=crop', category: 'car' },
    { id: 26, name: 'Sony Earphones', price: 719880, color: 'Silver', brand: 'Sony', image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop', category: 'earphones' },
    { id: 27, name: 'Power Bank Charger', price: 227880, color: 'Black', brand: 'Xiaomi', image: 'https://images.unsplash.com/photo-1591290619762-f88cea7d4aba?w=300&h=300&fit=crop', category: 'charger' },
    { id: 28, name: 'Lenovo Laptop', price: 5519880, color: 'Gray', brand: 'Lenovo', image: 'https://images.unsplash.com/photo-1588872657840-6aed008f3d75?w=300&h=300&fit=crop', category: 'laptop' },
    { id: 29, name: 'Graphic T-Shirt', price: 95880, color: 'Black', brand: 'Puma', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop', category: 't-shirt' },
    { id: 30, name: 'Summer Dress', price: 167880, color: 'Cyan', brand: 'Uniqlo', image: 'https://images.unsplash.com/photo-1595777707802-41d339d60280?w=300&h=300&fit=crop', category: 'dress' },
    { id: 31, name: 'Hybrid Bicycle', price: 959880, color: 'Gray', brand: 'Trek', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop', category: 'bicycle' },
    { id: 32, name: 'Premium Phone', price: 4199880, color: 'Purple', brand: 'OnePlus', image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=300&h=300&fit=crop', category: 'phone' },
    { id: 33, name: 'Beats Earphones', price: 959880, color: 'Red', brand: 'Beats', image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop', category: 'earphones' },
    { id: 34, name: 'Multi-port Charger', price: 299880, color: 'White', brand: 'Anker', image: 'https://images.unsplash.com/photo-1591290619762-f88cea7d4aba?w=300&h=300&fit=crop', category: 'charger' },
    { id: 35, name: 'HP Laptop', price: 6359880, color: 'Black', brand: 'HP', image: 'https://images.unsplash.com/photo-1588872657840-6aed008f3d75?w=300&h=300&fit=crop', category: 'laptop' },
  ];

  const [visibleCount, setVisibleCount] = useState(20); // 5 rows x 4 columns
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(allProducts.map(p => p.category))];

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.color.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allProducts]);

  // Get visible products
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 20);
  };

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
                  <button className='add-to-cart-btn'>Add to Cart</button>
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
