'use client';

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useState,
} from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { cartApi } from '@/lib/api/cart';

const CartContext = createContext(null);

const STORAGE_KEY = 'boxkart-cart';

function deriveTierAndCount(totalQuantity, pricingTiers) {
  if (!pricingTiers || pricingTiers.length === 0) {
    return { quantity: totalQuantity, count: 1 };
  }
  // Sort tiers from largest to smallest
  const sortedTiers = [...pricingTiers].sort((a, b) => b.qty - a.qty);
  // Find largest tier that perfectly divides totalQuantity
  for (const tier of sortedTiers) {
    if (totalQuantity % tier.qty === 0) {
      return { quantity: tier.qty, count: totalQuantity / tier.qty };
    }
  }
  // Fallback
  return { quantity: totalQuantity, count: 1 };
}

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
            id:
              action.payload.beId || `${product.id}-${quantity}-${Date.now()}`,
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
 * Syncs with BE when authenticated.
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const [isHydrated, setIsHydrated] = useState(false);
  const { user } = useAuth();

  // Hydrate from localStorage on mount (guests) OR fetch from BE
  useEffect(() => {
    async function initCart() {
      if (user) {
        try {
          // 1. Sync guest cart from localStorage if exists
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              for (const item of parsed) {
                // Ignore errors on sync (e.g., if item already exists or fails)
                try {
                  await cartApi.addItem(
                    item.product.id,
                    item.quantity * item.count
                  );
                } catch (e) {
                  // Silent
                }
              }
              localStorage.removeItem(STORAGE_KEY); // Clear after sync
            }
          }

          // 2. Fetch merged cart from BE
          const res = await cartApi.getCart();
          if (res?.data?.items) {
            // Map BE items to FE schema
            const beItems = res.data.items.map((item) => {
              // Normalize pricingTiers
              const product = { ...item.product };
              if (product.priceTiers) {
                product.pricingTiers = product.priceTiers.map((pt) => ({
                  qty: pt.minimumQuantity,
                  price: pt.unitPriceMinor / 100,
                }));
              }
              const { quantity, count } = deriveTierAndCount(
                item.quantity,
                product.pricingTiers
              );
              return {
                id: item.id,
                product,
                quantity,
                count,
              };
            });
            dispatch({ type: 'HYDRATE', payload: beItems });
          }
        } catch (e) {
          console.error('Failed to fetch/sync cart with BE', e);
        } finally {
          setIsHydrated(true);
        }
      } else {
        // Guest: LocalStorage hydration
        try {
          const saved = localStorage.getItem(STORAGE_KEY);
          if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
              dispatch({ type: 'HYDRATE', payload: parsed });
            }
          } else {
            dispatch({ type: 'CLEAR' });
          }
        } catch {
          // Ignore errors
        } finally {
          setIsHydrated(true);
        }
      }
    }

    initCart();
  }, [user]);

  // Persist to localStorage on change (for guests)
  useEffect(() => {
    if (isHydrated && !user) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [state.items, isHydrated, user]);

  const addItem = useCallback(
    async (product, quantity) => {
      // 1. Optimistic Update
      dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });

      // 2. Background API Sync
      if (user) {
        try {
          await cartApi.addItem(product.id, quantity);
          // Refetch to get updated item id and state from DB
          const res = await cartApi.getCart();
          if (res?.data?.items) {
            const beItems = res.data.items.map((item) => {
              const p = { ...item.product };
              if (p.priceTiers) {
                p.pricingTiers = p.priceTiers.map((pt) => ({
                  qty: pt.minimumQuantity,
                  price: pt.unitPriceMinor / 100,
                }));
              }
              const { quantity, count } = deriveTierAndCount(
                item.quantity,
                p.pricingTiers
              );
              return { id: item.id, product: p, quantity, count };
            });
            dispatch({ type: 'HYDRATE', payload: beItems });
          }
        } catch (e) {
          console.error('Failed to add item to BE', e);
        }
      }
    },
    [user]
  );

  const removeItem = useCallback(
    async (id) => {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
      if (user) {
        try {
          await cartApi.removeItem(id);
        } catch (e) {
          console.error('Failed to remove item from BE', e);
        }
      }
    },
    [user]
  );

  const updateQuantity = useCallback(
    async (id, quantity) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
      if (user) {
        try {
          await cartApi.updateItem(id, quantity);
        } catch (e) {
          console.error('Failed to update item quantity in BE', e);
        }
      }
    },
    [user]
  );

  const updateCount = useCallback(
    async (id, count) => {
      const item = state.items.find((i) => i.id === id);
      dispatch({ type: 'UPDATE_COUNT', payload: { id, count } });

      if (user && item) {
        try {
          await cartApi.updateItem(id, item.quantity * count);
        } catch (e) {
          console.error('Failed to update item count in BE', e);
        }
      }
    },
    [user, state.items]
  );

  const clearCart = useCallback(async () => {
    dispatch({ type: 'CLEAR' });
    if (user) {
      try {
        await cartApi.clearCart();
      } catch (e) {
        console.error('Failed to clear cart in BE', e);
      }
    }
  }, [user]);

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
