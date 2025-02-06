import AdminContainer from "../components/Admin/AdminContainer";
import Settings from "../components/Admin/AdminSettings";
import Nav from "../components/Navigation";
import AdminSettingsContext from "../context/AdminSettingsContext";
import { useState } from "react";

export default function Admin() {
  const [isActive, setIsActive] = useState("Password");
  return (
    <AdminSettingsContext.Provider value={{ isActive, setIsActive }}>
      <div className="container mx-auto px-4">
        <Nav />
        <div className="md:flex mt-16">
          <Settings />
          <AdminContainer />
        </div>
      </div>
    </AdminSettingsContext.Provider>
  );
}
