import Rating from '@mui/material/Rating';

export default function ProductCard() {
    return (
      <>
      <div>
        <a href="#" className="group relative block overflow-hidden">
        <button
            className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
        >
            <span className="sr-only">Wishlist</span>

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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
            </svg>
        </button>

        <img
            src="https://images.unsplash.com/photo-1549056572-75914d5d5fd4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white p-6">
            <span className="whitespace-nowrap bg-red-800 px-3 py-1.5 text-gray-50 text-xs font-medium"> New </span>

            <h3 className="mt-4 text-lg font-medium text-gray-900">Descent Board game</h3>

            <p className="mt-1.5 font-semibold text-sm text-gray-700">85.99€</p>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            <form className="mt-4">
            <button
                className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
            >
                Add to Cart
            </button>
            </form>
        </div>
        </a>
</div>
      </>
    );
  }