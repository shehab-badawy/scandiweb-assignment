import React from 'react';
import { useMutation } from "@apollo/client/react"; 
import { useCart } from '../context/CartContext';
import { PLACE_ORDER } from '../graphql/mutations';
import '../styles/cart-overlay.css';
import { toKebab } from '../utils/helpers';

const CartOverlay = () => {
  const { cart, updateQuantity, setIsOverlayOpen, clearCart } = useCart();
  const [placeOrder] = useMutation(PLACE_ORDER);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.prices[0].amount * item.quantity), 0);
  const currencySymbol = cart[0]?.prices[0].symbol || '$';

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    const itemsInput = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      selected_attributes: JSON.stringify(item.selectedAttributes)
    }));

    try {
      const { data } = await placeOrder({
        variables: {
          total_amount: totalPrice,
          currency_label: cart[0].prices[0].label,
          items: itemsInput
        }
      });

      // If backend returns data, we treat it as success
      if (data) {
        alert("Order placed successfully!"); 
        clearCart(); // Empties cart state and localStorage
        setIsOverlayOpen(false); // Closes the overlay
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("There was an error placing your order. Please try again.");
    }
  };

  return (
    <div data-testid="cart-overlay" className="cart-overlay-wrapper" onClick={() => setIsOverlayOpen(false)}>
      <div className="cart-overlay-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="overlay-title">
          <strong>My Bag</strong>, {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </h3>

        <div className="cart-items-list">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="overlay-item">
              <div className="item-info">
                <p className="item-brand">{item.brand}</p>
                <p className="item-name">{item.name}</p>
                <p className="item-price">{item.prices[0].symbol}{item.prices[0].amount.toFixed(2)}</p>

                {item.attributes.map(attr => (
                  <div key={attr.id} data-testid={`cart-item-attribute-${toKebab(attr.name)}`}>
                    <p className="attr-mini-label">{attr.name}:</p>
                    <div className="attr-mini-items">
                      {attr.items.map(option => {
                        const isSelected = item.selectedAttributes[attr.id] === option.id;
                        const isColor = attr.type === 'swatch';
                        const testIdBase = `cart-item-attribute-${toKebab(attr.name)}-${toKebab(option.displayValue)}`;
                        
                        return (
                          <div
                            key={option.id}
                            className={`mini-attr-btn ${isColor ? 'swatch' : ''} ${isSelected ? 'selected' : ''}`}
                            style={isColor ? { backgroundColor: option.value } : {}}
                            data-testid={isSelected ? `${testIdBase}-selected` : testIdBase}
                          >
                            {!isColor && option.displayValue}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="item-actions">
                <button 
                  className="qty-btn"
                  data-testid="cart-item-amount-increase"
                  onClick={() => updateQuantity(item.id, item.selectedAttributes, 1)}
                >+</button>
                <span className="qty-amount" data-testid="cart-item-amount">{item.quantity}</span>
                <button 
                  className="qty-btn"
                  data-testid="qty-btn" // Added for testing
                  onClick={() => updateQuantity(item.id, item.selectedAttributes, -1)}
                >-</button>
              </div>

              <div className="item-image">
                <img src={item.gallery[0]} alt={item.name} />
              </div>
            </div>
          ))}
        </div>

        <div className="overlay-total" data-testid="cart-total">
          <span>Total</span>
          <span>{currencySymbol}{totalPrice.toFixed(2)}</span>
        </div>

        <button 
          className="place-order-btn"
          data-testid="place-order-btn"
          disabled={cart.length === 0}
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default CartOverlay;