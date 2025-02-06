import { useContext } from "react";
import AdminSettingsContext from "../../context/AdminSettingsContext";

export default function AdminSettings() {
  const { isActive, setIsActive } = useContext(AdminSettingsContext);

  function handleOnClick(setting) {
    setIsActive(setting);
  }

  return (
    <div>
      <div className="w-full md:w-fit">
        <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-3 p-4 md:p-0">
          <h1 className="text-xl font-bold hidden md:block">Settings</h1>
          <button
            className={
              isActive === "Password"
                ? "text-red-800 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
                : "text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
            }
            onClick={() => handleOnClick("Password")}
          >
            Password
          </button>
          <button
            className={
              isActive === "Product-List"
                ? "text-red-800 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
                : "text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
            }
            onClick={() => handleOnClick("Product-List")}
          >
            Product List
          </button>
          <button
            className={
              isActive === "User-List"
                ? "text-red-800 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
                : "text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
            }
            onClick={() => handleOnClick("User-List")}
          >
            User List
          </button>
          <button
            className={
              isActive === "New-Product"
                ? "text-red-800 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
                : "text-gray-50 bg-gray-900 hover:bg-red-800 hover:text-gray-50 p-2 rounded-sm font-semibold"
            }
            onClick={() => handleOnClick("New-Product")}
          >
            New Product
          </button>
        </div>
      </div>
    </div>
  );
}
