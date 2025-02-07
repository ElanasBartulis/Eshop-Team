import { useContext, useState } from 'react';
import Nav from '../components/Navigation';
import { useCart } from '../context/CartContext';
import SessionContext from '../context/SessionContext';
import confetti from 'canvas-confetti';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export default function PaymentPage() {
  const { state, dispatch } = useCart();
  const { userData } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  // console.log(state);

  async function createHistory(e) {
    e.preventDefault();

    const userId = userData.id;
    const products = state.items.map((item) => ({
      id: item.productId,
      quantity: item.quantity,
    }));

    const history = { userId, products };

    await fetch(`/server/api/history`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(history),
    });
    //To clear items in cart after purchases
    await fetch('/server/api/cart/remove-all', {
      method: 'DELETE',
      credentials: 'include',
    });
    //To clear cart in front
    dispatch({ type: 'CLEAR_CART' });
  }

  function handleOpen() {
    setIsOpen(true);
    confetti({
      particleCount: 300,
      spread: 150,
    });
  }

  function handleClose() {
    setIsOpen(false);
  }

  const totals = state.items?.reduce(
    (sum, item) => {
      const basePrice = item.quantity * item.Product.price;
      const discount = item.Product.discount
        ? basePrice * (item.Product.discount / 100)
        : 0;
      const totalPrice = basePrice - discount;
      const vat = totalPrice * (21 / 100);

      return {
        totalPrice: sum.totalPrice + totalPrice,
        vat: sum.vat + vat,
        discount: sum.discount + discount,
      };
    },
    { totalPrice: 0, vat: 0, discount: 0 }
  ) || { totalPrice: 0, vat: 0, discount: 0 };

  const finalTotal = totals.totalPrice + totals.vat - totals.discount;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <Nav />
        <form onSubmit={createHistory}>
          <div className="min-h-screen">
            <div className="container mx-auto px-4 py-12 mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-6xl mx-auto">
                {/* Left Col */}
                <div>
                  <h2 className="text-gray-800 text-2xl mb-8">
                    DELIVERY INFORMATION
                  </h2>
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        defaultValue={userData.firstName}
                        name="firstName"
                        placeholder="First name"
                        className="w-full p-3 border border-gray-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        defaultValue={userData.lastName}
                        name="lastName"
                        placeholder="Last name"
                        className="w-full p-3 border border-gray-300 focus:outline-none"
                      />
                    </div>

                    {/* Email */}
                    <input
                      type="email"
                      defaultValue={userData.email}
                      name="email"
                      placeholder="Email address"
                      className="w-full p-3 border border-gray-300 focus:outline-none"
                    />

                    {/* Address & Zipcode */}
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        defaultValue={userData.address}
                        name="address"
                        placeholder="Address"
                        className="col-span-2 w-full p-3 border border-gray-300 focus:outline-none"
                      />
                      <input
                        type="text"
                        defaultValue={userData.postCode}
                        name="postCode"
                        placeholder="Zipcode"
                        className="w-full p-3 border border-gray-300 focus:outline-none"
                      />
                    </div>

                    {/* Phone */}
                    <input
                      type="tel"
                      defaultValue={userData.phoneNumber}
                      name="phone"
                      placeholder="Phone"
                      className="w-full p-3 border border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Right Col */}
                <div>
                  <h2 className="text-gray-800 text-2xl mb-8">CART TOTALS</h2>

                  {/* Cart Totals */}
                  <div className="space-y-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="font-bold">
                        {finalTotal.toFixed(2)}$
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping Fee</span>
                      <span className="font-bold">10$</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">
                        {(finalTotal + 10).toFixed(2)}$
                      </span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mt-12">
                    <h2 className="text-gray-800 text-2xl mb-8">
                      PAYMENT METHOD
                    </h2>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                        />
                        <span>Stripe</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                        />
                        <span>PayPal</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="payment"
                        />
                        <span>CASH ON DELIVERY</span>
                      </label>
                    </div>

                    <button
                      className="w-full bg-black text-white py-4 px-6 mt-8 hover:opacity-90"
                      type="submit"
                      onClick={handleOpen}
                    >
                      PLACE ORDER
                    </button>
                    <Dialog
                      open={isOpen}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Thanks for shopping with us!'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Your purchase history has been updated.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>OK</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
