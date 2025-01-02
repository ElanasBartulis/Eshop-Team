export default function sideLinks() {
  return (
    <div>
      <div className="w-fit">
        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">Settings</h1>
          <button className="text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold">
            Password
          </button>
          <button
            href="#"
            className="text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
          >
            Product List
          </button>
          <button
            href="#"
            className="text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
          >
            User List
          </button>
          <button
            href="#"
            className="text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
          >
            New Product
          </button>
        </div>
      </div>
    </div>
  );
}
