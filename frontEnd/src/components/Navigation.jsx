import Logo from "../assets/Public/logo.png";
import userIcon from "../assets/Public/user-icon.svg";
import shoppingCart from "../assets/Public/shopping-cart.svg";
import ModalLogin from "./ModalLogin";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import ShoppingCartModal from "./ShoppingCartModal";
import { useContext, useEffect, useMemo, useState } from "react";
import { Modal, Box } from "@mui/material";
import SearchComponent from "../components/SearchComponent";
import SearchContext from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function Nav({ children }) {
  const [openShopingCartModal, setOpenShopingCartModal] = useState(false);

  const { state } = useCart();

  const totalItems = useMemo(() => {
    return state?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [state.items]);

  const handleOpen = () => setOpenShopingCartModal(true);
  const handleClose = () => setOpenShopingCartModal(false);

  return (
    <nav className="sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100 border-b border-gray-200">
      <div className="w-full md:w-auto flex justify-between items-center">
        <Link to="/">
          <img
            src={Logo}
            alt="logo image"
            className="size-12 md:size-16"
            style={{ cursor: "pointer" }}
          />
        </Link>

        <div className="md:hidden flex gap-2 items-center" onClick={handleOpen}>
          <div className="relative">
            <img src={shoppingCart} alt="" className="size-4" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0">
        <div>
          <SearchComponent />
        </div>

        <div className="flex gap-4 md:gap-8 items-center">
          <div className="flex gap-2 items-center">
            <img src={userIcon} alt="" className="size-4 hover:text-red-800" />
            <ModalLogin />
          </div>

          <Logout />

          <div
            className="hidden md:flex gap-2 items-center relative"
            onClick={handleOpen}
          >
            <div className="relative">
              <img
                src={shoppingCart}
                alt=""
                className="size-4 hover:text-red-800"
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-800 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <a href="#" className="hover:text-red-800">
              Cart
            </a>
          </div>
        </div>
      </div>

      <Modal
        open={openShopingCartModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            right: { xs: "5%", md: "10%" },
            width: { xs: "90%", md: 450 },
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 1,
          }}
        >
          <ShoppingCartModal closeModal={handleClose} />
        </Box>
      </Modal>
    </nav>
  );
}
