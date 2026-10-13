import { createContext, useContext, useState, useEffect } from "react";

// CartContext manages the shopping cart state across the entire app.
// It saves the cart to localStorage so items persist after page refresh.

const CartContext = createContext();

const STORAGE_KEY = "novacart_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a product to the cart (increase quantity if already present)
  function addToCart(product, selectedSize, selectedColor) {
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];
    const itemKey = `${product.id}-${size}-${color}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          color,
          quantity: 1,
        },
      ];
    });
  }

  // Change the quantity of a cart item (minimum 1)
  function updateQuantity(itemKey, newQty) {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.key === itemKey ? { ...item, quantity: newQty } : item
      )
    );
  }

  // Remove an item from the cart entirely
  function removeFromCart(itemKey) {
    setCartItems((prev) => prev.filter((item) => item.key !== itemKey));
  }

  // Empty the entire cart
  function clearCart() {
    setCartItems([]);
  }

  // Total number of items (used for the cart badge in the navbar)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal of all items
  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so any component can access the cart easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
