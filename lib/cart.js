'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'boxkart-cart';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.quantity === quantity
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existing.id ? { ...item, count: item.count + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `${product.id}-${quantity}-${Date.now()}`,
            product,
            quantity,
            count: 1,
          },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'UPDATE_COUNT':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, count: action.payload.count }
            : item
        ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'HYDRATE':
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

/**
 * CartProvider wraps the app and manages cart state with localStorage persistence.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore localStorage errors
    }
  }, [state.items]);

  const addItem = useCallback((product, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  }, []);

  const removeItem = useCallback((id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const updateCount = useCallback((id, count) => {
    dispatch({ type: 'UPDATE_COUNT', payload: { id, count } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.count, 0);

  /** Subtotal before tax/shipping. */
  const subtotal = state.items.reduce((sum, item) => {
    const tier = item.product.pricingTiers?.find(
      (t) => t.qty === item.quantity
    );
    const price = tier?.price ?? item.product.pricingTiers?.[0]?.price ?? 0;
    return sum + price * item.quantity * item.count;
  }, 0);

  /** Free shipping above ₹5,000. */
  const FREE_SHIPPING_THRESHOLD = 5000;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 199;

  /** GST at 18% on packaging materials. */
  const gst = Math.round(subtotal * 0.18);

  /** Final total. */
  const totalPrice = subtotal + shipping + gst;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        updateCount,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        gst,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Hook to access cart context.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
