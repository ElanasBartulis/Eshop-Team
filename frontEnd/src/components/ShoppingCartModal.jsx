import { useNavigate } from 'react-router-dom';

export default function ShoppingCartModal() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/checkout');
    }

    return (
        <div
        className="relative border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
        >
        <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
            <span className="sr-only">Close cart</span>

            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="mt-4 space-y-6">
            <ul className="space-y-4">
            <li className="flex items-center gap-4">
                <img
                src="https://images.unsplash.com/photo-1549056572-75914d5d5fd4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-16 rounded object-cover"
                />

                <div>
                <h3 className="text-sm text-gray-900">Descent Board Game</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                        <dt className="inline">Board Game</dt>
                    </div>
                </dl>
                </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                    <label htmlFor="Line1Qty" className="sr-only"> Quantity </label>

                    <input
                    type="number"
                    min="1"
                    value="1"
                    id="Line1Qty"
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </form>

                <button className="text-gray-600 transition hover:text-red-600">
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

            <li className="flex items-center gap-4">
                <img
                src="https://images.unsplash.com/photo-1549056572-75914d5d5fd4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-16 rounded object-cover"
                />

                <div>
                <h3 className="text-sm text-gray-900">Descent Board Game</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                            <dt className="inline">Board Game</dt>
                        </div>
                    </dl>
                    </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                    <label htmlFor="Line2Qty" className="sr-only"> Quantity </label>

                    <input
                    type="number"
                    min="1"
                    value="1"
                    id="Line2Qty"
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </form>

                <button className="text-gray-600 transition hover:text-red-600">
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

            <li className="flex items-center gap-4">
                <img
                src="https://images.unsplash.com/photo-1549056572-75914d5d5fd4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-16 rounded object-cover"
                />

                <div>
                <h3 className="text-sm text-gray-900">Descent Board Game</h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                    <div>
                            <dt className="inline">Board Game</dt>
                        </div>
                    </dl>
                    </div>

                <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                    <label htmlFor="Line3Qty" className="sr-only"> Quantity </label>

                    <input
                    type="number"
                    min="1"
                    value="1"
                    id="Line3Qty"
                    className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </form>

                <button className="text-gray-600 transition hover:text-red-600">
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
            </ul>

            <div className="space-y-4 text-center">
            
            <button
              className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
              onClick={handleClick}
            >
              Checkout
            </button>
            
            <a
                href="#"
                className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
            >
                Continue shopping
            </a>
            </div>
        </div>
        </div>
    );
}