import { useContext } from "react";

export default function Menu({ activeSection, handleSection }) {
  return (
    <>
      <div className=" md:w-2/6 sm:w-3/6">
        <h2 className="text-gray-50 text-xl font-bold mb-4">Menu</h2>
        <ul className="space-y-2">
          {activeSection === "dashboard" ? (
            <li className="text-red-800 hover:bg-red-800 hover:text-gray-50 p-2 rounded cursor-pointer">
              Dashboard
            </li>
          ) : (
            <li
              className="text-gray-50 hover:bg-red-800 p-2 rounded cursor-pointer"
              onClick={() => handleSection("dashboard")}
            >
              Dashboard
            </li>
          )}
          {activeSection === "purchaseHistory" ? (
            <li className="text-red-800 hover:bg-red-800 hover:text-gray-50 p-2 rounded cursor-pointer">
              Purchase history
            </li>
          ) : (
            <li
              className="text-gray-50 hover:bg-red-800 p-2 rounded cursor-pointer"
              onClick={() => handleSection("purchaseHistory")}
            >
              Purchase history
            </li>
          )}
          {activeSection === "editProfile" ? (
            <li className="text-red-800 hover:bg-red-800 hover:text-gray-50 p-2 rounded cursor-pointer">
              Edit profile
            </li>
          ) : (
            <li
              className="text-gray-50 hover:bg-red-800 p-2 rounded cursor-pointer"
              onClick={() => handleSection("editProfile")}
            >
              Edit profile
            </li>
          )}
          {activeSection === "changePassword" ? (
            <li className="text-red-800 hover:bg-red-800 hover:text-gray-50 p-2 rounded cursor-pointer">
              Change password
            </li>
          ) : (
            <li
              className="text-gray-50 hover:bg-red-800 p-2 rounded cursor-pointer"
              onClick={() => handleSection("changePassword")}
            >
              Change password
            </li>
          )}
          {activeSection === "wishlist" ? (
            <li className="text-red-800 hover:bg-red-800 hover:text-gray-50 p-2 rounded cursor-pointer">
              My Wishlist
            </li>
          ) : (
            <li
              className="text-gray-50 hover:bg-red-800 p-2 rounded cursor-pointer"
              onClick={() => handleSection("wishlist")}
            >
              My Wishlist
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
