import { createContext, useReducer, useContext, useEffect } from 'react';
import SessionContext from './SessionContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.map((item) => ({
          ...item,
          Product: item.Product,
        })),
      };
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (existingItemIndex !== -1) {
        // Use the server response quantity instead of adding
        const updatedItems = state.items.map((item) => {
          if (item.productId === action.payload.productId) {
            return {
              ...item,
              quantity: action.payload.quantity, // Use server response quantity
            };
          }
          return item;
        });

        return {
          ...state,
          items: updatedItems,
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isLoading: true,
  });
  const { userData } = useContext(SessionContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        if (!userData) {
          dispatch({ type: 'CLEAR_CART' });
        }

        const response = await fetch('/server/api/cart', {
          credentials: 'include',
        });

        const cart = await response.json();

        if (cart && cart.CartItems) {
          dispatch({ type: 'SET_CART', payload: cart.CartItems });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchCart();
  }, [userData?.id]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
