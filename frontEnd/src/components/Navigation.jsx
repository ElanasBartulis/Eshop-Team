import Logo from '../assets/Public/logo.png';
import userIcon from '../assets/Public/user-icon.svg';
import shoppingCart from '../assets/Public/shopping-cart.svg';
import ModalLogin from './ModalLogin';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import ShoppingCartModal from './ShoppingCartModal';
import { useState } from "react";
import { Modal, Box } from "@mui/material";

export default function Nav() {
  const [open, setOpen] = useState(false);
  
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
            style={{ cursor: 'pointer' }}
          />
        </Link>
      </div>

      <div className="flex justify-evenly gap-8">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pr-12 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2 px-3 py-1 text-gray-50 bg-gray-900 rounded-3xl hover:bg-red-800 hover:text-gray-50">
            Go
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <img
            src={userIcon}
            alt=""
            className="size-4 hover:text-red-800"
          />
          {/* Ar prisijunges? <ZilvinoAccountSettings/> : <ModalLogin/> */}
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
              <ShoppingCartModal/>
            </Box>
          </Modal>
        </div>

        <Logout />

        <div className="flex gap-2 items-center" onClick={handleOpen} >
          <img
            src={shoppingCart}
            alt=""
            className="size-4 hover:text-red-800"
          />
          <a
            href="#"
            className="hover:text-red-800"
          >
            Cart
          </a>
        </div>
      </div>
    </nav>
  );
}
