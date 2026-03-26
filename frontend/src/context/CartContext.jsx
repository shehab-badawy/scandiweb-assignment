import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);


  useEffect(() => {
    const savedCart = localStorage.getItem('scandi_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('scandi_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedAttributes) => {
    setCart(prevCart => {
      // 1. Find if the exact same product with exact same attributes exists
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex > -1) {
        // 2. IMMUTABLE UPDATE: Map through the cart and return a NEW object for the match
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      // 3. Add as a brand new line item if not found
      return [...prevCart, { ...product, selectedAttributes, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, selectedAttributes, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId && JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean); // Remove items if quantity hits 0
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, isOverlayOpen, setIsOverlayOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);