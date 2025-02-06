import { TextField } from "@mui/material";
import Nav from "../components/Navigation";
import { useState } from "react";
import HistoryTable from "../components/userComponents/HistoryTable";
import Menu from "../components/userComponents/Menu";
import Greeting from "../components/userComponents/Greeting";
import EditProfile from "../components/userComponents/EditProfile";
import ChangePassword from "../components/userComponents/ChangePassword";
import UserDashboard from "../components/userComponents/UserDashboard";
import Wishlist from "../components/userComponents/Wishlist";

export default function UserPanel() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleSection(section) {
    setActiveSection(section);
    setIsMobileMenuOpen(false); // Close menu after selection on mobile
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          <Nav />

          {/* Mobile Menu Button */}
          <div className="lg:hidden mt-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full bg-gray-900 text-white p-4 rounded shadow"
            >
              {isMobileMenuOpen ? "Hide Menu" : "Show Menu"}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } mt-4`}
          >
            <div className="bg-gray-900 p-4 rounded shadow">
              <Menu
                activeSection={activeSection}
                handleSection={handleSection}
              />
            </div>
          </div>

          {/* Desktop and Content Layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-4 lg:mt-10">
            {/* Desktop Menu - Hidden on Mobile */}
            <div className="hidden lg:block bg-gray-900 p-4 rounded shadow">
              <Menu
                activeSection={activeSection}
                handleSection={handleSection}
              />
            </div>

            {/* Content Area - Full Width on Mobile */}
            <div className="lg:col-span-2">
              <Greeting />
              <div className="bg-white p-4 sm:p-6 rounded shadow h-auto">
                <UserDashboard activeSection={activeSection} />
                <EditProfile activeSection={activeSection} />
                <ChangePassword activeSection={activeSection} />
                <Wishlist activeSection={activeSection} />
                {activeSection === "purchaseHistory" && (
                  <div>
                    <HistoryTable />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
