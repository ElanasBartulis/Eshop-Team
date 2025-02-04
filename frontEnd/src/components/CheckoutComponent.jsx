import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutComponent() {
  const { state, dispatch } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [itemCalculations, setItemCalculations] = useState({});
  const [totals, setTotals] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/server/api/cart", {
          credentials: "include",
        });

        const cart = await response.json();

        if (cart && cart.CartItems) {
          dispatch({ type: "SET_CART", payload: cart.CartItems });
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    if (state.items) {
      const calculations = state.items.map((product) => {
        const basePrice = product.quantity * product.Product.price;
        const discount = product.Product.discount
          ? basePrice * (product.Product.discount / 100)
          : 0;

        const totalPrice = basePrice - discount;
        const vat = totalPrice * (21 / 100);

        return {
          totalPrice: totalPrice,
          vat: vat,
          discount: discount,
        };
      });

      setItemCalculations(calculations);

      const totalCalculation = calculations.reduce(
        (sum, item) => ({
          totalPrice: sum.totalPrice + item.totalPrice,
          vat: sum.vat + item.vat,
          discount: sum.discount + item.discount,
        }),
        {
          totalPrice: 0,
          vat: 0,
          discount: 0,
        }
      );

      setTotals(totalCalculation);
    } else {
      setItemCalculations([]);
      setTotals({
        totalPrice: 0,
        vat: 0,
        discount: 0,
      });
    }
  }, [state.items]);

  if (isLoading) {
    return <div>Loading cart...</div>;
  }

  // if no products in cart
  if (!state.items || state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-100 rounded-lg p-8">
        <div className="flex gap-4">
          <div className="bg-gray-200 rounded-full p-4 mb-4"></div>
          <div className="bg-gray-200 rounded-full p-4 mb-4"></div>
          <div className="bg-gray-200 rounded-full p-4 mb-4"></div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Your cart is empty
        </h2>

        <p className="text-gray-500 text-center mb-6 max-w-sm">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>

        <button
          className="block rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
          onClick={() => navigate("/")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  async function handleRemoveItem(productId) {
    try {
      const response = await fetch("/server/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      dispatch({
        type: "REMOVE_ITEM",
        payload: productId,
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  async function handleQuantityChange(productId, newQuantity) {
    try {
      const response = await fetch("/server/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: parseInt(newQuantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      const updatedItem = await response.json();

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: {
          productId,
          quantity: parseInt(newQuantity),
        },
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>

          <div className="mt-8">
            <ul className="space-y-4">
              {state.items.map((product) => (
                <li key={product.id} className="flex items-center gap-4">
                  <img
                    src={`/server/api/upload/image/${product.Product.image[0]}`}
                    alt={product.Product?.name || "Product image"}
                    className="size-16 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-sm text-gray-900">
                      {product.Product?.name || "Board Game"}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                      <div>
                        <dt className="inline">Board game</dt>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                      <label htmlFor="Line1Qty" className="sr-only">
                        {" "}
                        Quantity{" "}
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            product.Product.id,
                            e.target.value
                          )
                        }
                        id="Line1Qty"
                        className="w-12 h-8 text-center focus:outline-none"
                      />
                    </form>

                    <button
                      className="text-gray-600 transition hover:text-red-600"
                      onClick={() => handleRemoveItem(product.Product.id)}
                    >
                      <span className="sr-only">Remove item</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>{+totals.totalPrice.toFixed(2)}€</dd>
                    {/* <dd>0€</dd> */}
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>{+totals.vat.toFixed(2)}€</dd>
                    {/* <dd>{0}€</dd> */}
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>{+totals.discount.toFixed(2)}€</dd>
                    {/* <dd>0€</dd> */}
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>
                      {
                        +(
                          totals.totalPrice +
                          totals.vat -
                          totals.discount
                        ).toFixed(2)
                      }
                      {/* 0€ */}
                    </dd>
                  </div>
                </dl>

                {totals.discount ? (
                  <div className="flex justify-end">
                    <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="-ms-1 me-1.5 size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>

                      <p className="whitespace-nowrap text-xs">
                        Discounts Applied
                      </p>
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div className="flex justify-end">
                  <button className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
