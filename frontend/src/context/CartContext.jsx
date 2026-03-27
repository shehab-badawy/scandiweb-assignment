import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('scandi_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('scandi_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedAttributes) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );

      if (existingItemIndex > -1) {
        return prevCart.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
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
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('scandi_cart');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      updateQuantity, 
      isOverlayOpen, 
      setIsOverlayOpen, 
      setCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);