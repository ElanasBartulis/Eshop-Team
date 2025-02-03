export default function Sorting({ sortName }) {
  function handeleChange(e) {
    const value = e.target.value;

    if (value == 'priceAscending') {
      sortName('priceAscending');
    }
    if (value == 'priceDescending') {
      sortName('priceDescending');
    }
    if (value == 'sortByName') {
      sortName('sortByName');
    }
    if (value == 'sortByRating') {
      sortName('sortByRating');
    }
  }

  return (
    <>
      <div className="w-full max-w-sm min-w-[200px]">
        <label className="block mb-1 text-sm text-slate-800">Sort by:</label>
        <div className="relative">
          <select
            onChange={handeleChange}
            defaultValue=""
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
          >
            <option
              value=""
              disabled
              hidden
            >
              Choose option...
            </option>
            <option value="sortByName">Name (A-Z) </option>
            <option value="priceAscending">Price (Low to High)</option>
            <option value="priceDescending">Price (High to Low)</option>
            <option value="sortByRating">Rating (High to Low)</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.2"
            stroke="currentColor"
            className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
