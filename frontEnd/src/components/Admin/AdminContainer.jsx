import AdminContainerPassword from "./AdminContainerPassword";
import ProductList from "./AdminProductList";
import UserList from "./AdminUserList";
import NewProduct from "./AdminNewProduct";
import AdminSettingsContext from "../../context/AdminSettingsContext";
import { useContext } from "react";

export default function AdminContainer() {
  const { isActive } = useContext(AdminSettingsContext);

  function changePage() {
    switch (isActive) {
      case "Password":
        return <AdminContainerPassword />;
      case "Product-List":
        return <ProductList />;
      case "User-List":
        return <UserList />;
      case "New-Product":
        return <NewProduct />;
      default:
        return <AdminContainerPassword />;
    }
  }
  return (
    <div className="w-full">
      <div className="mx-4 lg:ml-20 mb-10">{changePage()}</div>
    </div>
  );
}
