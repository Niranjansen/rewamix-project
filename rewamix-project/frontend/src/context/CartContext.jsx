import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("rewamix_cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("rewamix_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product === product._id);
      if (exists) {
        return prev.map((item) =>
          item.product === product._id
            ? { ...item, qty: Math.min(item.qty + qty, product.countInStock) }
            : item
        );
      }
      return [
        ...prev,
        {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        },
      ];
    });
  };

  const updateQty = (productId, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product === productId
          ? { ...item, qty: Math.max(1, Math.min(qty, item.countInStock)) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product !== productId));
  };

  const clearCart = () => setCartItems([]);

  const itemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        itemsCount,
        itemsPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
