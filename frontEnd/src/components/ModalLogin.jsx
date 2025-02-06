import React, { useState } from "react";
import { useContext } from "react";
import { Button, Modal, Box, Stack, CircularProgress } from "@mui/material";
import Logo from "../assets/Public/logo.png";
import useLogin from "../custom-hooks/useLogin";
import SessionContext from "../context/SessionContext.js";
import useRegister from "../custom-hooks/useRegister.js";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "../components/SnackBarComponent.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "95%",
    sm: "80%",
    md: "70%",
    lg: "1200px",
  },
  maxHeight: {
    xs: "90vh",
    sm: "80vh",
    md: "90vh",
  },
  overflowY: "auto",
  bgcolor: "background.paper",
};

export default function ModalSwitcher() {
  const [activeModal, setActiveModal] = useState("login");
  const [isLoading, setIsLoading] = useState();

  const { sessionState, open, setOpen, userData, setErrorHandler } =
    useContext(SessionContext);

  const { onLogin } = useLogin();
  const { onRegister } = useRegister();
  const navigate = useNavigate();

  const handleOpen = () => {
    if (sessionState.isLogged) {
      setIsLoading(true);
      //Navigate with small delay
      setTimeout(() => {
        if (userData.admin) {
          navigate("/admin");
        } else {
          navigate("/user");
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 400);
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActiveModal("login");
  };

  const openModal = (modal) => {
    setActiveModal(modal);
    setOpen(true);
  };

  const handleLogin = (event) => {
    onLogin(event);
  };

  const handleRegister = (event) => {
    onRegister(event);
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50">
          <Stack
            sx={{
              color: "grey.500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              gap: "20px",
            }}
            spacing={2}
            direction="row"
          >
            <CircularProgress sx={{ color: "rgb(153 27 27)" }} />
            Loading...
          </Stack>
        </div>
      )}
      <Button className="hover:text-red-800 text-gray-900" onClick={handleOpen}>
        {/* Session.Login ? Vardas : Account */}
        {sessionState.isLogged ? userData.firstName : "Account"}
      </Button>

      {activeModal === "login" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-login-title"
          aria-describedby="modal-login-description"
        >
          <Box sx={style}>
            <section className="bg-white">
              <div className="lg:grid lg:grid-cols-12">
                <aside className="lg:block relative h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                  <img
                    alt=""
                    src="https://as2.ftcdn.net/v2/jpg/11/07/08/39/1000_F_1107083939_966YkM6xT5jjtX1bwXyxf1e8LHVhXmQn.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </aside>
                <main className="flex items-center justify-center px-4 py-4 sm:px-8 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                  <div className="w-full max-w-xl lg:max-w-3xl">
                    <img
                      src={Logo}
                      alt="Logo"
                      className="h-12 sm:h-20 w-auto"
                    />
                    <h1 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      Welcome Back! Login
                    </h1>
                    <form
                      className="mt-4 sm:mt-8 grid grid-cols-6 gap-4 sm:gap-6"
                      onSubmit={handleLogin}
                    >
                      <div className="col-span-6">
                        <label
                          htmlFor="Email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="Email"
                          name="email"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 sm:h-10 px-2"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          htmlFor="Password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          id="Password"
                          name="password"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 sm:h-10 px-2"
                        />
                      </div>
                      <div className="col-span-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                        <button className="w-full sm:w-auto inline-block shrink-0 rounded-md border bg-gray-900 px-8 sm:px-12 py-2 sm:py-3 text-sm font-medium text-white transition hover:bg-red-800 hover:text-white focus:outline-none">
                          Login
                        </button>
                        <p className="mt-3 sm:mt-0 text-sm text-gray-500">
                          First time here?{" "}
                          <button
                            onClick={() => openModal("register")}
                            className="text-gray-700 underline mx-1 hover:text-red-800 font-bold"
                          >
                            Register
                          </button>
                        </p>
                      </div>
                    </form>
                  </div>
                </main>
              </div>
            </section>
          </Box>
        </Modal>
      )}

      {activeModal === "register" && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-register-title"
          aria-describedby="modal-register-description"
        >
          <Box sx={style}>
            <section className="bg-white">
              <div className="lg:grid lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                  <img
                    alt=""
                    src="https://as2.ftcdn.net/v2/jpg/11/07/08/39/1000_F_1107083939_966YkM6xT5jjtX1bwXyxf1e8LHVhXmQn.jpg"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </aside>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                  <div className="max-w-xl lg:max-w-3xl">
                    <a className="block text-blue-600" href="/">
                      <span className="sr-only">Home</span>
                      <img src={Logo} alt="Logo" className="h-20 w-auto" />
                    </a>

                    <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                      New to Board Games? Register
                    </h1>

                    <form
                      action="#"
                      className="mt-8 grid grid-cols-6 gap-6"
                      onSubmit={handleRegister}
                    >
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="FirstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>

                        <input
                          type="text"
                          id="FirstName"
                          name="firstName"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 px-1"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="LastName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>

                        <input
                          type="text"
                          id="LastName"
                          name="lastName"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 px-1"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          htmlFor="Email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Email{" "}
                        </label>

                        <input
                          type="email"
                          id="Email"
                          name="email"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 px-1"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="Password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {" "}
                          Password{" "}
                        </label>

                        <input
                          type="password"
                          id="Password"
                          name="password"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 px-1 "
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="PasswordConfirmation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password Confirmation
                        </label>

                        <input
                          type="password"
                          id="PasswordConfirmation"
                          name="passwordConfirmation"
                          className="mt-1 w-full border border-gray-900 bg-white text-sm text-gray-700 shadow-sm h-8 px-1"
                        />
                      </div>

                      <div className="col-span-6">
                        <label htmlFor="MarketingAccept" className="flex gap-4">
                          <input
                            type="checkbox"
                            id="MarketingAccept"
                            name="marketing_accept"
                            className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                          />

                          <span className="text-sm text-gray-700">
                            I want to receive emails about events, product
                            updates and company announcements.
                          </span>
                        </label>
                      </div>

                      <div className="col-span-6">
                        <p className="text-sm text-gray-500">
                          By creating an account, you agree to our
                          <a href="#" className="text-gray-700 underline">
                            {" "}
                            terms and conditions{" "}
                          </a>
                          and
                          <a href="#" className="text-gray-700 underline">
                            privacy policy
                          </a>
                          .
                        </p>
                      </div>

                      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                        <button className="inline-block shrink-0 rounded-md border bg-gray-900 px-12 py-3 text-sm font-medium text-white transition hover:bg-red-800 hover:text-white focus:outline-none focus:ring active:text-blue-500">
                          Create an account
                        </button>
                      </div>
                      <div className="col-span-5 ">
                        Already have an account?
                        <button
                          onClick={() => openModal("login")}
                          className="text-gray-700 underline mx-1 hover:text-red-800 font-bold"
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </main>
              </div>
            </section>
          </Box>
        </Modal>
      )}
      <SnackbarComponent />
    </div>
  );
}
