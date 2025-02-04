import Logo from "../assets/Public/logo.png";
import userIcon from "../assets/Public/user-icon.svg";
import shoppingCart from "../assets/Public/shopping-cart.svg";
import ModalLogin from "./ModalLogin";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import ShoppingCartModal from "./ShoppingCartModal";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import SearchComponent from "../components/SearchComponent";
import SearchContext from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function Nav({ children }) {
  const [open, setOpen] = useState(false);
  const { state } = useCart();

  console.log("Cart state:", state);
  console.log("Cart items:", state?.cartItems);

  const totalItems =
    state?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  console.log("Total items:", totalItems);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="flex justify-between items-center pt-4">
      <div>
        <Link to="/">
          <img
            src={Logo}
            alt="logo image"
            className="size-16"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </div>

      <div className="flex justify-evenly gap-8">
        <SearchComponent />
        <div className="flex gap-2 items-center">
          <img src={userIcon} alt="" className="size-4 hover:text-red-800" />
          <ModalLogin />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "10%",
                width: 450,
                bgcolor: "background.paper",
                p: 4,
                borderRadius: 1,
              }}
            >
              <ShoppingCartModal />
            </Box>
          </Modal>
        </div>

        <Logout />

        <div className="flex gap-2 items-center relative" onClick={handleOpen}>
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
    </nav>
  );
}
