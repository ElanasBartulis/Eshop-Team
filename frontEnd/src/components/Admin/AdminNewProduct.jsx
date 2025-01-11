import Textarea from "@mui/joy/Textarea";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import SessionContext from "../../context/SessionContext";

export default function NewProduct() {
  const { setErrorHandler } = useContext(SessionContext);

  const [minMaxPriceInput, setMinMaxPriceInput] = useState("");
  const [minMaxDiscountInput, setMinMaxDiscountInput] = useState("");

  function handleNumberChange(min, max, event, setter) {
    const value = event.target.value;
    if (value === "" || (Number(value) >= min && Number(value) <= max)) {
      setter(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const productData = {
      name: formData?.get("productName"),
      price: +formData?.get("price"),
      discount: +formData?.get("discount"),
      description: formData?.get("description"),
      rating: 0,
    };

    try {
      const promise = await fetch(`http://localhost/server/api/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const response = await promise.json();

      if (promise.ok) {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: "Product successfully created!",
          alertColor: "success",
        });
      } else {
        setErrorHandler({
          isSnackbarOpen: true,
          snackbarMessage: response.error || "Failed to create product",
          alertColor: "error",
        });
      }
    } catch (error) {
      setErrorHandler({
        isSnackbarOpen: true,
        snackbarMessage: error || "An error occurred",
        alertColor: "error",
      });
    }
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-4">Add new product</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-14">
          <TextField
            variant="outlined"
            type="text"
            fullWidth
            required
            label="Product name"
            name="productName"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <TextField
            variant="outlined"
            type="number"
            fullWidth
            required
            label="Price"
            name="price"
            value={minMaxPriceInput}
            onChange={(event) =>
              handleNumberChange(0, 1000000, event, setMinMaxPriceInput)
            }
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <TextField
            variant="outlined"
            type="number"
            fullWidth
            label="Discount"
            name="discount"
            value={minMaxDiscountInput}
            onChange={(event) =>
              handleNumberChange(0, 99, event, setMinMaxDiscountInput)
            }
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                borderColor: "rgb(17 24 39)",
              },

              "& .MuiInputLabel-root": {
                color: "rgb(17 24 39)",
              },
            }}
          />
          <div className="flex flex-col gap-2">
            <TextField
              multiline
              variant="outlined"
              name="description"
              placeholder="Description"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(17 24 39)",
                    borderWidth: 2,
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "rgb(17 24 39)",
                },
              }}
            />
          </div>
          <button
            type="submit"
            className="block w-full rounded bg-gray-900 p-4 text-gray-50 text-sm font-medium transition hover:scale-105 hover:text-red-800"
          >
            Save changes!
          </button>
        </form>
      </div>
    </>
  );
}
