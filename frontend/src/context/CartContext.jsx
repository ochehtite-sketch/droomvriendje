import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackAddToCart, trackRemoveFromCart, trackViewCart } from '../utils/analytics';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('droomvriendjes_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('droomvriendjes_cart', JSON.stringify(cart));
  }, [cart]);

  // Track view_cart when cart opens
  useEffect(() => {
    if (isCartOpen && cart.length > 0) {
      trackViewCart(cart);
    }
  }, [isCartOpen, cart]);

  const addToCart = (product) => {
    // GA4: Track add_to_cart
    trackAddToCart(product, 1);
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    // GA4: Track remove_from_cart
    const product = cart.find(item => item.id === productId);
    if (product) {
      trackRemoveFromCart(product, product.quantity);
    }
    
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Bereken subtotaal (zonder korting)
  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Bereken korting: 2e knuffel 50% korting
  // Per 2 items van hetzelfde product: 1x volle prijs + 1x 50% korting
  const getDiscount = () => {
    let discount = 0;
    cart.forEach(item => {
      // Voor elke 2 items krijg je 50% korting op 1 item
      const discountedItems = Math.floor(item.quantity / 2);
      discount += discountedItems * (item.price * 0.5);
    });
    return discount;
  };

  // Totaal na korting
  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const getItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getSubtotal,
      getDiscount,
      getTotal,
      getItemCount,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};
