import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import client from '../graphql/client';
import { GET_CATEGORIES } from '../graphql/queries';
import { useCart } from '../context/CartContext';
import CartOverlay from './CartOverlay';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const { cart, isOverlayOpen, setIsOverlayOpen } = useCart(); 
  const location = useLocation();

  useEffect(() => {
    client.query({ query: GET_CATEGORIES })
      .then(res => setCategories(res.data.categories))
      .catch(err => console.error("Header Fetch Error:", err));
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <nav className="navigation">
        {categories.map((cat) => {
          const isActive = location.pathname === `/${cat.name}` || 
                          (location.pathname === '/' && cat.name === 'all');
          
          return (
            <NavLink
              key={cat.name}
              to={`/${cat.name}`}
              className={isActive ? 'nav-link active' : 'nav-link'}
              data-testid={isActive ? 'active-category-link' : 'category-link'}
            >
              {cat.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="logo">
        <img src="/icons.svg" alt="Store Logo" />
      </div>

      <div className="actions">
        <button 
          className="cart-btn" 
          data-testid='cart-btn'
          onClick={() => setIsOverlayOpen(prev => !prev)}
        >
          <span className="cart-icon">🛒</span>
          {totalItems > 0 && (
            <span className="cart-count-bubble">{totalItems}</span>
          )}
        </button>
      </div>
      {isOverlayOpen && <CartOverlay />}
    </header>
  );
};

export default Header;